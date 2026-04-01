# Visão Geral da Ferramenta

O repositório analisado implementa algo maior que um “chat de terminal”. Ele é uma plataforma agêntica de código com múltiplas superfícies de entrada, um loop central de raciocínio e execução, um sistema de ferramentas governado por políticas e várias formas de persistência para manter contexto e continuidade. Essa combinação é exatamente o que distingue um assistente de código sofisticado de um shell wrapper em volta de uma API de LLM.

O aspecto arquitetural mais importante é que o produto não trata interface, motor de query, ferramentas, permissões e estado como uma única massa. Há acoplamentos, claro, mas também existem fronteiras relativamente claras. O boot mora nos entrypoints, a orquestração da conversa aparece em `src/query.ts`, o objeto `QueryEngine` em `src/QueryEngine.ts` empacota esse ciclo para fluxos headless e SDK, as tools são registradas em `src/tools.ts`, a governança de permissão vive em `src/utils/permissions/permissionSetup.ts`, e as superfícies web/bridge/MCP se conectam a esse núcleo em vez de reimplementá-lo.

<div class="diagram">
  <div class="diagram__header">Mapa macro do sistema</div>
  <div class="diagram__body">
    <div class="diagram-layers">
      <div class="diagram-layer diagram-layer--surface">
        <p class="diagram-layer__title">Superfícies</p>
        <p class="diagram-layer__text">CLI/TUI em Ink, web em Next.js, API/PTY server, bridge remoto e MCP server. Cada superfície tem ciclo de vida próprio, mas nenhuma deveria reinventar o motor conversacional.</p>
      </div>
      <div class="diagram-layer diagram-layer--core">
        <p class="diagram-layer__title">Núcleo agêntico</p>
        <p class="diagram-layer__text">`src/query.ts` coordena iterações, streaming, tool calls, recovery, compactação e orçamento. `src/QueryEngine.ts` encapsula esse loop para usos reaproveitáveis.</p>
      </div>
      <div class="diagram-layer diagram-layer--governance">
        <p class="diagram-layer__title">Governança e extensibilidade</p>
        <p class="diagram-layer__text">Permissões, feature flags, MCP, bridge, plugins, skills e classificação de tools controlam o que pode ser feito e como capacidades externas entram no sistema.</p>
      </div>
      <div class="diagram-layer diagram-layer--state">
        <p class="diagram-layer__title">Persistência e estado</p>
        <p class="diagram-layer__text">Sessões JSONL, `MEMORY.md`, AppState, stores web, SQLite/Postgres e registros de tool use sustentam continuidade, replay e operação.</p>
      </div>
    </div>
    <p class="diagram__caption">A arquitetura não é “uma UI com tools”; ela é um pipeline de decisão e execução cercado por camadas de segurança, extensibilidade e persistência.</p>
  </div>
</div>

## Superfícies do produto

Há pelo menos cinco superfícies relevantes para entender o desenho do sistema. A primeira é a experiência principal em terminal, iniciada por `src/entrypoints/cli.tsx` e renderizada com React + Ink. A segunda é a web app em `web/`, que reutiliza parte do backend próprio e parte do servidor em `src/server/`. A terceira é a API e o PTY server em `src/server/`, que permitem transformar a conversa em serviço acessível por browser e automação. A quarta é o bridge remoto em `src/bridge/`, cujo papel é ligar uma sessão local a um ambiente controlado remotamente. A quinta é o MCP, em que o produto tanto consome capacidades externas quanto pode se expor como servidor.

Essas superfícies importam porque um produto agêntico real não vive apenas na happy path da CLI. Quando a arquitetura acomoda múltiplos front doors, o valor do núcleo compartilhado cresce muito. É aí que o projeto ganha robustez: a inteligência operacional não fica presa ao terminal, e as integrações não precisam duplicar regras de execução, tool loop e tratamento de erro.

## O loop central

O coração do sistema está em `src/query.ts`. Ali aparece um `async generator` que itera turnos do modelo, processa streaming, coleta blocos `tool_use`, executa ferramentas, incorpora os resultados de volta à conversa e decide se continua ou se encerra. Isso parece um detalhe de implementação, mas na prática é a principal decisão arquitetural do sistema. Em vez de pensar “uma requisição entra e uma resposta sai”, o projeto assume desde cedo que uma resposta de agente é uma trajetória composta por vários passos intermediários.

`src/QueryEngine.ts` organiza esse comportamento em uma abstração reutilizável. Isso permite transportar o mesmo núcleo para usos headless, integrações SDK e rotas especializadas sem duplicar o protocolo interno da conversa. O resultado é uma separação útil: `query.ts` concentra a lógica procedural do loop, enquanto `QueryEngine.ts` assume a responsabilidade de ciclo de vida, estado acumulado, replay, memória e compatibilidade com consumidores externos.

<div class="diagram">
  <div class="diagram__header">Sequência simplificada de um turno</div>
  <div class="diagram__body">
    <div class="diagram-flow">
      <div class="diagram-flow__step">
        <p class="diagram-card__title">1. Entrada</p>
        <p class="diagram-card__meta">Prompt do usuário, contexto de sistema, memória, config de tools e políticas.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">2. Amostragem</p>
        <p class="diagram-card__meta">Streaming do modelo, coleta de blocos textuais e `tool_use`.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">3. Execução</p>
        <p class="diagram-card__meta">Ferramentas são validadas, autorizadas, executadas em série ou paralelo e transformadas em `tool_result`.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">4. Continuação</p>
        <p class="diagram-card__meta">O loop decide se compacta, retenta, recupera erro, chama hooks ou conclui a sessão.</p>
      </div>
    </div>
  </div>
</div>

## O sistema de ferramentas como segunda coluna da arquitetura

O motor do produto não entrega valor se não puder agir sobre o ambiente. É por isso que `src/tools.ts` e `src/Tool.ts` são tão centrais. As tools não são helpers soltos; elas são unidades de capacidade com schema, regras de concorrência, critérios de permissão, nome legível para o usuário e, em muitos casos, renderização própria. Em outras palavras, a tool carrega semântica operacional e semântica de governança ao mesmo tempo.

O projeto também reconhece que nem toda ferramenta pode ser tratada do mesmo jeito. `src/services/tools/toolOrchestration.ts` separa chamadas concurrency-safe de chamadas mutantes, formando batches paralelos para leitura/pesquisa e serializando operações que alteram estado. Esse detalhe é um bom exemplo de maturidade arquitetural: paralelismo não é adotado como “otimização genérica”, mas como política informada pelo tipo de efeito que cada tool produz.

## Governança como parte do runtime, não como acessório

Sistemas agênticos quebram rápido quando permissão, política e segurança aparecem tarde demais. Aqui, isso foi incorporado como parte do caminho crítico. O arquivo `src/utils/permissions/permissionSetup.ts` mostra que o projeto não trabalha com uma simples lista allow/deny. Ele compõe múltiplas origens de configuração, modos operacionais distintos, regras com curingas, validações específicas para Bash/PowerShell e checagens especiais para cenários de auto mode e subagentes.

Essa escolha tem impacto direto no desenho do produto. O agente não pode ser pensado separadamente do mecanismo que decide se ele pode agir. Em produtos desse tipo, governança não é um “middleware”; é um componente de arquitetura equivalente ao query loop.

## Persistência em camadas

Há vários níveis de persistência coexistindo. O transcript da CLI usa arquivos JSONL por sessão, o sistema de memória usa diretórios com `MEMORY.md` e arquivos temáticos, o AppState mantém a fotografia viva da sessão interativa, e a camada web/backend traz schemas para `users`, `conversations`, `messages`, `tool_uses`, `sessions` e `shared_links`. Essa diversidade pode parecer redundante, mas ela revela uma decisão correta: diferentes tipos de continuidade pedem diferentes formatos.

Persistir uma conversa para replay não é o mesmo problema que preservar preferências do usuário para sessões futuras, e nenhum dos dois é igual ao problema de modelar entidades de produto para API e analytics. A arquitetura separa esses casos em vez de forçar um storage único para tudo.

## O que aprender com essa arquitetura

O repositório ensina que construir um agente de código não é apenas plugar um modelo em um shell. O desafio real está em transformar iterações probabilísticas do modelo em um sistema determinístico o bastante para operar com segurança. Isso exige um loop explícito, ferramentas tipadas, políticas de autorização, formatos de persistência adequados e várias superfícies que convergem para um mesmo núcleo.

Também ensina um contraponto importante: quanto mais superfícies e feature flags um produto adquire, maior a pressão por modularidade real. O código mostra vários sinais de sucesso nesse sentido, mas também mostra como esse tipo de sistema tende naturalmente ao crescimento estrutural. Entender esse equilíbrio é a melhor forma de ler o restante desta documentação.
