# Tarefas, Subagentes e Coordenação

O suporte a tasks e subagentes é o ponto em que o produto mais claramente deixa de ser um agente único e vira sistema multiator. O código em `src/tasks/`, `src/tools/AgentTool/`, `src/tasks/LocalAgentTask/`, `src/tasks/InProcessTeammateTask/` e áreas relacionadas mostra que delegação, background execution e teammate coordination foram tratados como responsabilidades explícitas do runtime.

Isso importa porque, sem modelagem própria, subagente vira apenas recursão de prompt. Aqui, ele vira entidade operacional com task state, progresso, transcript, notificações, capacidade de receber mensagens pendentes, retenção de output em disco e integração com a UI principal.

## Dois modelos de paralelismo

O código mostra ao menos dois modelos de expansão. O primeiro é o `LocalAgentTask`, mais próximo de um agente filho controlado como task autônoma. O segundo é o `InProcessTeammateTask`, que representa um teammate executado dentro do mesmo processo com identidade própria, suporte a espera por trabalho e fluxo especial para interação contínua. Essa distinção é importante porque diferentes formas de paralelismo pedem contratos diferentes de isolamento, custo e observabilidade.

## Coordenação como problema de produto

Quando tasks e teammates aparecem, a UI e o transcript principal precisam saber o que fazer com eles. É por isso que o sistema inclui notificações estruturadas, painéis dedicados, foreground/backgrounding, views de transcript de agente e sincronização com AppState. Em outras palavras, coordenar múltiplos agentes não é só questão de spawning; é questão de tornar o trabalho deles inteligível para o usuário e para o agente líder.

## Progresso e resumo

Trechos como `LocalAgentTask.tsx` mostram tracking de tool counts, token counts, atividades recentes e summaries. Isso é excelente do ponto de vista arquitetural, porque um subagente sem telemetria de progresso é praticamente invisível até falhar ou terminar. O runtime tenta reduzir essa opacidade expondo sinais parciais úteis.

## Riscos e acoplamentos

O suporte a multiagente aumenta muito a carga de estado. Task lifecycle, mensagens pendentes, retenção de transcript, output em disco e seleção de painel passam a competir por clareza dentro do AppState. Esse é um dos pontos onde a arquitetura mostra força e risco ao mesmo tempo: ela consegue oferecer coordenação rica, mas faz isso ao custo de grande densidade conceitual.

## O que aprender

Delegação efetiva exige duas coisas ao mesmo tempo: uma boa abstração de task e uma boa superfície de observação. O repositório mostra isso com clareza. A parte difícil de multiagente não é apenas iniciar outro agente; é manter legibilidade, controle e integração com a sessão principal enquanto vários atores trabalham em paralelo.
