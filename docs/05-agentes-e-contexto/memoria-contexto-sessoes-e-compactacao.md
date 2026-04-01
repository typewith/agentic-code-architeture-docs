# Memória, Contexto, Sessões e Compactação

Um dos melhores aspectos do repositório é tratar contexto como problema de engenharia e não apenas como limite de janela de tokens. `src/query.ts` lida com mensagens, anexos, tracking de compactação, recuperação por `prompt_too_long`, budgets e resumos de tool use. Em paralelo, `src/memdir/` cuida de memória persistente, e `src/QueryEngine.ts` mantém o estado acumulado de uma conversa. Essas camadas diferentes mostram que o sistema sabe que “lembrar” não é uma operação única.

Há pelo menos três tipos de continuidade coexistindo. O transcript corrente mantém a trajetória detalhada da sessão. A memória em diretório preserva fatos que devem sobreviver entre conversas. E a compactação tenta reduzir custo sem perder o que é estrutural para o turno atual. Cada uma resolve um problema diferente e por isso merece estratégia própria.

## Memória persistente em diretório

`src/memdir/memdir.ts` é particularmente instrutivo. Em vez de guardar tudo em um banco abstrato, o sistema usa um diretório de memória com um arquivo índice `MEMORY.md` e arquivos temáticos com frontmatter. Essa decisão aproxima memória do espaço de trabalho do usuário e dá ao agente um mecanismo auditável e editável por humanos.

Além disso, a memória não é carregada de forma ingênua. `findRelevantMemories.ts` mostra uma etapa de seleção, usando um side query para escolher quais memórias são realmente úteis para a consulta atual. Isso é elegante porque evita tanto o esquecimento total quanto o despejo indiscriminado de contexto irrelevante.

## Compactação como mecanismo de sobrevivência

O loop em `src/query.ts` trata compactação como parte da vida normal do sistema, não como rotina manual eventual. Há tracking de auto compact, compactação reativa em caso de prompt longo, e mecanismos para reconstruir mensagens após boundaries específicos. Isso ensina um ponto central sobre agentes de código: o problema de contexto não pode ser terceirizado ao modelo; o runtime precisa ter política própria para administrar a conversa ao longo do tempo.

<div class="diagram">
  <div class="diagram__header">Camadas de continuidade no sistema</div>
  <div class="diagram__body">
    <div class="diagram-grid--3">
      <div class="diagram-card">
        <p class="diagram-card__title">Transcript da sessão</p>
        <p class="diagram-card__meta">Mensagens detalhadas do turno atual e histórico recente. Servem para replay, UI e continuidade imediata.</p>
      </div>
      <div class="diagram-card">
        <p class="diagram-card__title">Memória persistente</p>
        <p class="diagram-card__meta">Conhecimento que deve sobreviver a sessões futuras e pode ser recuperado seletivamente.</p>
      </div>
      <div class="diagram-card">
        <p class="diagram-card__title">Compactação</p>
        <p class="diagram-card__meta">Redução controlada da conversa para manter utilidade sob limites de token e custo.</p>
      </div>
    </div>
  </div>
</div>

## Sessão como objeto vivo

`QueryEngine` e `AppState` revelam que a sessão é tratada como objeto persistente em memória, não como função pura. Há mensagens mutáveis, tracking de uso, file cache, permissões órfãs, state store e referências a tasks, teammates, bridge e plugins. Isso é necessário porque uma sessão agêntica rica precisa ser capaz de mudar de forma ao longo do tempo.

O preço dessa riqueza é maior complexidade de estado. O produto aceita esse custo porque prefere uma sessão longa e governável a uma interação descartável e rasa.

## O que aprender

Produtos desse tipo precisam separar cuidadosamente “o que o modelo precisa agora”, “o que o sistema precisa lembrar sempre” e “o que pode ser resumido sem quebrar a tarefa”. O repositório não resolve tudo perfeitamente, mas resolve o mais importante: ele reconhece essas categorias como distintas e constrói mecanismos específicos para cada uma.
