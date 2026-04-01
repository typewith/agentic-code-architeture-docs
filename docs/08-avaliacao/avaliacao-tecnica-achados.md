# Avaliação Técnica e Achados

O principal achado arquitetural do repositório é positivo: o produto entende que um sistema agêntico de código precisa de um núcleo explícito de orquestração. `src/query.ts`, `src/QueryEngine.ts`, `src/tools.ts` e a camada de permissões deixam isso muito claro. Em vez de esconder o comportamento do agente atrás de mágica implícita, o runtime modela turnos, tools, transições, retries, budgets, memória e recuperação de erro como partes concretas do sistema.

Esse é um mérito grande, porque muitos produtos desse tipo falham justamente por não darem nome e estrutura ao loop central. Aqui, o loop existe, é observável e conversa com camadas claras de tools, UI e política.

## Forças estruturais

Há pelo menos quatro forças dignas de nota.

1. **Separação razoável entre superfície e núcleo.** CLI, web, bridge e MCP se conectam ao runtime em vez de cada um reinventar o agente.
2. **Sistema de tools formalizado.** As tools possuem schema, semântica de concorrência e governança própria, o que é raro em produtos mais improvisados.
3. **Governança tratada como parte do runtime.** Permissões, auto mode e regras perigosas não aparecem como afterthought.
4. **Operação levada a sério.** Há saúde, métricas, dashboards, rate limits, autenticação e deploys múltiplos.

Esses pontos indicam um projeto que passou do estágio de protótipo. A arquitetura já assume preocupações de produto real.

## O que chama atenção na qualidade do desenho

O desenho de memória e compactação também merece elogio. O sistema diferencia transcript, memória persistente e compactação, o que mostra entendimento profundo de um problema típico de agentes longos. Da mesma forma, a modelagem de tasks e teammates mostra que o time percebeu cedo que multiagente precisa de estado, visibilidade e lifecycle próprios.

Outro aspecto interessante é a convivência de flexibilidade e disciplina. Há muitas feature flags e caminhos diferentes de produto, mas os pontos de montagem continuam relativamente centralizados em registries, entrypoints e loaders. Isso ajuda a conter a entropia natural de um sistema em rápida expansão.

## Limite da avaliação positiva

Os pontos fortes não eliminam um fato: a arquitetura já carrega sinais claros de crescimento pesado. A existência de arquivos muito grandes, principalmente em entrypoints e áreas centrais, sugere que algumas fronteiras ainda não estão tão maduras quanto o desenho geral faz parecer. O sistema é bom em explicitar subsistemas, mas às vezes ainda concentra demais a coordenação deles em pontos únicos.

Essa é uma observação importante porque revela o estágio do produto: suficientemente evoluído para ter arquitetura, suficientemente grande para começar a sentir o preço dessa própria evolução.
