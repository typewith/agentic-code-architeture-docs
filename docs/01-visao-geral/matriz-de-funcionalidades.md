# Matriz de Funcionalidades

Esta matriz não tenta ser uma checklist de marketing. O objetivo é ligar capacidades visíveis do produto aos módulos que as sustentam, para deixar claro onde uma funcionalidade realmente nasce. Em sistemas agênticos de código, a mesma feature aparente quase sempre depende de várias camadas ao mesmo tempo: interface, query loop, tool system, governança e persistência.

## Matriz principal

| Capacidade percebida | Módulos centrais | O que isso revela sobre a arquitetura |
|---|---|---|
| Conversa interativa no terminal | `src/entrypoints/cli.tsx`, `src/main.tsx`, `src/screens/REPL.tsx`, `src/components/` | A experiência terminal é uma aplicação React/Ink, não um loop de stdin/stdout improvisado. |
| Loop de raciocínio com tools | `src/query.ts`, `src/QueryEngine.ts`, `src/services/tools/toolOrchestration.ts` | O comportamento do agente é um gerador iterativo, não uma chamada única ao modelo. |
| Execução de shell, leitura e edição de arquivos | `src/tools/`, `src/tools.ts`, `src/Tool.ts` | Cada capacidade é formalizada como tool com schema, governança e política de concorrência. |
| Aprovação, auto mode e políticas | `src/utils/permissions/permissionSetup.ts`, `src/hooks/useCanUseTool.js` | Segurança é parte do runtime do agente, não um controle lateral. |
| Memória persistente e contexto recuperável | `src/memdir/`, `src/services/compact/`, `src/utils/messages.ts` | O sistema distingue memória de longo prazo, transcript e compactação de contexto. |
| Slash commands | `src/commands.ts`, `src/commands/` | O produto mistura interface local e prompts orientados ao modelo sem confundir os dois. |
| Multiagente e tasks | `src/tasks/`, `src/tools/AgentTool/`, `src/coordinator/` | Delegação é tratada como subsistema próprio, com estado, notificações e governança. |
| Integração com IDE/remoto | `src/bridge/`, `src/bridge/bridgeMain.ts` | A sessão pode ser exposta como backend de outra experiência sem duplicar o núcleo. |
| Consumo e exposição via MCP | `src/services/mcp/`, `src/entrypoints/mcp.ts`, `mcp-server/` | O sistema atua como cliente e servidor em um ecossistema de tools e recursos. |
| Web app com streaming | `web/`, `src/server/api/`, `src/server/web/` | A experiência browser é desacoplada em front-end web, API unificada e sessão PTY. |
| Observabilidade e métricas | `src/server/observability/`, `src/services/analytics/`, `grafana/` | O produto foi desenhado para ser medido, não só executado. |

## Leitura da matriz por camada

Uma maneira útil de interpretar a matriz é perceber que quase toda feature atravessa cinco perguntas. Primeiro: qual superfície a expõe ao usuário? Segundo: que parte do loop central a orquestra? Terceiro: que tools ou serviços executam o trabalho? Quarto: que regras de permissão e policy a limitam? Quinto: que estado ou persistência ela produz?

Esse tipo de leitura evita um erro comum em análises superficiais: achar que uma feature “mora” em um arquivo específico. Na prática, uma funcionalidade madura é quase sempre uma composição. O comando `/review`, por exemplo, envolve registro de command, prompt preparado, uso do query loop, eventual execução de tools, checagens de permissão e atualização do transcript. O mesmo vale para `/mcp`, `/memory` ou `/tasks`.

## Funcionalidades que são sinais de maturidade

Algumas capacidades merecem atenção especial porque mostram decisões arquiteturais fortes. O paralelismo seguro de tools em `toolOrchestration.ts` é uma delas: o projeto não executa tudo em paralelo só porque pode; ele distingue leitura de mutação e transforma isso em regra de orquestração. Outro exemplo é o sistema de memória em `src/memdir/`, que constrói um diretório persistente com convenções próprias em vez de empilhar tudo em um prompt gigante.

Também vale destacar a presença simultânea de `src/query.ts` e `src/QueryEngine.ts`. Isso indica a separação entre a lógica procedural do loop e a abstração orientada a ciclo de vida que pode ser usada por SDKs e integrações. Em muitos projetos, essas camadas ficam misturadas; aqui, elas começam a ganhar identidade própria.

## Onde a matriz aponta para complexidade

A matriz também ajuda a localizar zonas de custo arquitetural. Extensibilidade, por exemplo, atravessa `src/services/mcp/`, `src/bridge/`, `src/plugins/`, `src/skills/` e várias gates de feature flag. Isso mostra poder de expansão, mas também revela o risco natural de fragmentação conceitual. Da mesma forma, a coexistência de web app, API REST/SSE, PTY over WebSocket e CLI nativa indica versatilidade, mas aumenta a necessidade de contratos bem definidos entre superfícies.

Em outras palavras, a matriz é útil não só para admirar cobertura funcional, mas para perceber onde o sistema precisa de disciplina modular para não virar um emaranhado. Essa tensão é inevitável em produtos agênticos de larga superfície e reaparece em várias seções desta documentação.
