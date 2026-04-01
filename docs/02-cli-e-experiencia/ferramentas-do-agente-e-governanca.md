# Ferramentas do Agente e Governança

Em um sistema como este, a palavra “tool” significa mais do que uma chamada auxiliar. A tool é a unidade mínima de ação que o modelo pode solicitar ao runtime. Ela precisa ser compreensível para o modelo, segura para o sistema, rastreável para o usuário e tratável pela UI. É por isso que `src/Tool.ts` e `src/tools.ts` ocupam um espaço tão central na arquitetura.

Cada tool carrega nome, schema de entrada, política de permissão, semântica de concorrência e, em muitos casos, uma forma específica de renderizar progresso e resultado. Isso revela uma decisão madura: o projeto não deixa o comportamento operacional implícito. O modelo pede uma capability, mas essa capability só existe porque o software a modela de forma formal.

## Registro e composição de tools

`src/tools.ts` funciona como catálogo e como ponto de composição. Ele reúne tools built-in, aplica gates de feature flag, incorpora ferramentas condicionais, resolve lazy imports para evitar ciclos e ainda separa o que é elegível em determinado ambiente. É aqui que o sistema afirma, em termos concretos, “estas são as ações que o agente pode conhecer nesta sessão”.

Essa centralização é importante porque evita um problema comum em plataformas agênticas: tools espalhadas por toda parte, sem um inventário confiável. Quando o conjunto de ações possíveis não é explícito, a governança fica opaca e a depuração se torna muito mais difícil.

## Execução e concorrência

`src/services/tools/toolOrchestration.ts` mostra um dos melhores trechos arquiteturais do projeto. As chamadas são particionadas em batches conforme o retorno de `isConcurrencySafe`. Tools de leitura e busca podem ser executadas em paralelo até um limite configurável por ambiente. Tools mutantes ou potencialmente perigosas são serializadas. O sistema ainda preserva modificadores de contexto gerados por tools concorrentes e os aplica depois do batch.

Essa solução tem valor didático porque captura a diferença entre “paralelizar porque ficou elegante” e “paralelizar porque o efeito da operação permite”. O código assume uma postura conservadora por padrão: se a classificação falha, a tool é tratada como não segura para concorrência. É exatamente assim que um runtime desse tipo deveria se comportar.

## Governança: o outro lado da tool

Ferramenta sem governança vira vulnerabilidade. A outra metade da arquitetura aparece em `src/utils/permissions/permissionSetup.ts` e nos hooks de permissão. O sistema compõe regras vindas de várias fontes, interpreta formatos com curingas, separa modos como `default`, `plan`, `bypassPermissions` e `auto`, e ainda aplica tratamentos especiais para casos perigosos, como permissões amplas de Bash ou delegação irrestrita para subagentes.

O ponto profundo aqui é que a governança não é externa às tools; ela é parte da definição prática delas. Uma `BashTool` sem política de autorização não é apenas uma feature incompleta, é outro produto. Por isso o runtime modela capacidade e permissão como partes do mesmo contrato.

<div class="diagram">
  <div class="diagram__header">Da solicitação do modelo até a execução segura</div>
  <div class="diagram__body">
    <div class="diagram-sequence">
      <div class="diagram-sequence__lane">
        <p class="diagram-sequence__title">Modelo</p>
        <div class="diagram-sequence__body">
          <p>Emite bloco `tool_use` com nome e input.</p>
          <p>Pode solicitar múltiplas tools em um único turno.</p>
        </div>
      </div>
      <div class="diagram-sequence__lane">
        <p class="diagram-sequence__title">Runtime</p>
        <div class="diagram-sequence__body">
          <p>Resolve a tool no registro.</p>
          <p>Valida schema e classifica concorrência.</p>
        </div>
      </div>
      <div class="diagram-sequence__lane">
        <p class="diagram-sequence__title">Governança</p>
        <div class="diagram-sequence__body">
          <p>Aplica regras, modo atual, classifier e fluxo de aprovação.</p>
          <p>Pode negar, pausar ou autoaprovar conforme policy.</p>
        </div>
      </div>
      <div class="diagram-sequence__lane">
        <p class="diagram-sequence__title">UI e transcript</p>
        <div class="diagram-sequence__body">
          <p>Mostra progresso, pedido de aprovação e resultado.</p>
          <p>Converte saída em `tool_result` para o próximo passo do loop.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## O que essa seção ensina

Ela ensina que o agente não deve ser modelado como um ente abstrato “capaz de tudo”. O agente é um consumidor disciplinado de operações delimitadas pelo software. Esse recorte é o que torna possível combinar autonomia com segurança e auditoria.

Também ensina que a boa tool não é a que apenas “funciona”, mas a que sabe explicar ao runtime como deve ser executada, autorizada e exibida. Essa é a diferença entre um ecossistema improvisado de funções e uma plataforma agêntica de verdade.
