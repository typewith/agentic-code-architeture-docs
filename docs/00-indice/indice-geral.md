# Índice Geral

Esta documentação foi reorganizada para funcionar como material de estudo sobre a arquitetura de um sistema agêntico de código no estilo Claude Code. O objetivo não é apenas listar pastas e features, mas explicar como um produto desse tipo consegue combinar interface terminal, execução de ferramentas, coordenação de agentes, streaming de respostas, governança de permissões, memória persistente e múltiplas superfícies de acesso sem colapsar em um monólito impossível de evoluir.

O repositório usado como fonte primária fica em `C:\Users\carlos.fonseca\Documents\Donwloads\claude-codelike`. A leitura dos documentos foi ancorada principalmente em módulos como `src/entrypoints/cli.tsx`, `src/query.ts`, `src/QueryEngine.ts`, `src/tools.ts`, `src/services/tools/toolOrchestration.ts`, `src/utils/permissions/permissionSetup.ts`, `src/services/mcp/client.ts`, `src/bridge/bridgeMain.ts`, `src/memdir/`, `src/tasks/`, `src/server/` e `web/`. Sempre que a documentação fala de comportamento, o ideal é que esse comportamento seja rastreável a essas áreas.

## Como ler esta documentação

Se a intenção for entender o sistema de ponta a ponta, a ordem recomendada é começar pela visão geral, seguir para CLI e experiência interativa, depois passar por agentes e contexto, extensibilidade, web/backend e só então entrar nos tópicos operacionais e na avaliação crítica. Essa sequência acompanha o caminho natural do produto: primeiro a superfície que o usuário vê, depois o loop que sustenta essa superfície, e por fim as camadas de integração, dados e operação que tornam o produto viável em produção.

Se a intenção for estudar somente um problema arquitetural específico, a documentação também foi estruturada por trilhas. Quem quer entender o núcleo agentic deve priorizar `01-visao-geral`, `02-cli-e-experiencia` e `05-agentes-e-contexto`. Quem quer entender exposição de serviços e produto web deve ler `03-web-e-api` e `06-backend-e-dados`. Quem quer estudar extensibilidade e ecossistema deve focar em `04-extensibilidade`. Já `07-operacao` e `08-avaliacao` são as seções que mostram o que acontece quando uma boa arquitetura precisa sobreviver fora da máquina do desenvolvedor.

## Estrutura da documentação

### 00. Índice

Esta seção organiza o material, explica o mapa de leitura e serve como porta de entrada. Ela não descreve o sistema em si, mas ajuda a navegar pelo sistema descrito.

### 01. Visão Geral

Aqui está o mapa macro: superfícies do produto, camadas, fluxo principal de runtime, papel do query loop e relação entre CLI, web, bridge, MCP, persistência e governança.

### 02. CLI e Experiência

Explica como o processo sobe, como os fast paths reduzem custo de inicialização, como o REPL é montado em React + Ink e como slash commands, renderização e tool output se combinam em uma experiência interativa coerente.

### 03. Web e API

Mostra a divisão entre a aplicação web em `web/` e os serviços em `src/server/`, incluindo REST, SSE, PTY over WebSocket, exportação, compartilhamento e busca.

### 04. Extensibilidade

Documenta como o sistema se abre para o mundo externo: bridge remoto, MCP cliente e servidor, plugins, skills, tool search e feature flags.

### 05. Agentes e Contexto

É a seção mais próxima do “cérebro operacional” do produto. Ela cobre contexto, compactação, memória, permissões, tasks, subagentes e coordenação entre atores paralelos.

### 06. Backend e Dados

Desce da conversa para a infraestrutura: modelagem, persistência, autenticação, middleware, rate limit, segurança de execução e observabilidade.

### 07. Operação

Mostra o que é necessário para rodar, empacotar, publicar e monitorar um sistema desse porte com Bun, Docker, Helm, métricas e integrações operacionais.

### 08. Avaliação

Transforma a leitura do código em análise crítica. Em vez de repetir o funcionamento, esta seção discute acertos, tensões estruturais, gargalos e lições arquiteturais.

### 09. Referências

Fecha a documentação com glossário, rastreabilidade de fontes e atalhos para revisitar os módulos mais relevantes.

## Trilhas de estudo sugeridas

| Trilha | Ordem sugerida | O que você aprende |
|---|---|---|
| **Arquitetura central** | 01 → 02 → 05 | Como o loop agêntico é montado, controlado e mantido consistente |
| **Produto web e backend** | 03 → 06 → 07 | Como o sistema vira serviço, API, sessão remota e operação em produção |
| **Extensibilidade** | 04 → 05 → 09 | Como ferramentas, skills, plugins, MCP e bridge ampliam o sistema |
| **Leitura crítica** | 01 → 05 → 08 | Quais decisões escalam bem e quais viram dívida estrutural |

## O que diferencia esta leitura

O ponto central deste material é tratar o repositório como um estudo de arquitetura, não como uma coleção de implementações. Um sistema agêntico de código raramente falha porque “faltou uma tool”; ele falha quando não há clareza de fronteira entre interface, coordenação, permissão, persistência e execução. Por isso, cada documento tenta responder não só “o que existe”, mas “por que existe”, “o que protege”, “o que acopla” e “o que um arquiteto deveria aprender observando essa decisão”.
