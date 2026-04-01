# Mapa de Fontes e Rastreabilidade

Esta documentação foi escrita com o repositório `C:\Users\carlos.fonseca\Documents\Donwloads\claude-codelike` como fonte primária. O objetivo desta página é facilitar revisitas ao código e deixar transparente de onde vêm os principais argumentos arquiteturais apresentados ao longo dos documentos.

## Fontes centrais por tema

| Tema | Fontes principais |
|---|---|
| Boot e CLI | `src/entrypoints/cli.tsx`, `src/main.tsx`, `src/replLauncher.tsx`, `src/screens/REPL.tsx` |
| Query loop e ciclo da sessão | `src/query.ts`, `src/QueryEngine.ts` |
| Registro e execução de tools | `src/Tool.ts`, `src/tools.ts`, `src/services/tools/toolOrchestration.ts` |
| Permissões e políticas | `src/utils/permissions/permissionSetup.ts`, `src/hooks/useCanUseTool.js` |
| Memória e contexto | `src/memdir/memdir.ts`, `src/memdir/findRelevantMemories.ts`, `src/services/compact/` |
| Tasks e multiagente | `src/tasks/`, `src/tools/AgentTool/`, `src/coordinator/` |
| MCP | `src/services/mcp/client.ts`, `src/entrypoints/mcp.ts`, `mcp-server/` |
| Bridge remoto | `src/bridge/bridgeMain.ts` e arquivos adjacentes |
| API e conversas | `src/server/api/index.ts`, `src/server/api/routes/conversations.ts`, `src/server/api/services/conversation-service.ts` |
| Modelagem de dados | `src/server/db/schema/sqlite.ts`, `src/server/db/schema/postgres.ts` |
| Sessões PTY web | `src/server/web/pty-server.ts`, `src/server/web/session-manager.ts` |
| Segurança | `src/server/security/command-sandbox.ts`, `src/server/security/rate-limiter.ts`, `src/server/auth/` |
| Observabilidade | `src/server/observability/metrics.ts`, `src/server/observability/health.ts`, `src/server/observability/sentry.ts`, `grafana/` |
| Entrega | `Dockerfile`, `helm/claude-code/`, `vercel.json` |

## Como usar este mapa

Quando um documento desta base mencionar um comportamento específico, o ideal é que você consiga localizar esse comportamento em um desses pontos de origem. Se não conseguir, trate o trecho da documentação como hipótese interpretativa e reabra o código. Essa prática é saudável porque sistemas agênticos grandes têm muitas variantes condicionadas por feature flag ou ambiente.

## Nível de confiança das descrições

- **Alto** para fluxos explicitamente observados em arquivos lidos durante a análise, como boot da CLI, query loop, tool orchestration, permissões, conversas via API, sandbox, PTY server, session manager, memória e métricas.
- **Médio** para áreas inferidas a partir de estrutura, registries e contratos evidentes, mas sem leitura profunda de todos os arquivos adjacentes, como alguns detalhes de plugin lifecycle e coordenação avançada.
- **Deliberadamente limitado** em qualquer ponto dependente de código behind feature flag não aberto diretamente durante a análise. Nesses casos, a documentação descreve a intenção arquitetural mais do que cada detalhe de implementação.

## Critério editorial usado

Os documentos priorizam explicar responsabilidades, fluxos, decisões e tradeoffs. Eles evitam reproduzir trechos longos de código e evitam transformar a documentação em inventário de pasta. Quando um arquivo é citado, a intenção é indicar o lugar mais útil para continuar a investigação, não listar todas as ocorrências possíveis.
