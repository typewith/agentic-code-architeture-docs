# Guia da Seção: Extensibilidade

Esta seção explica como o sistema sai do seu núcleo local e passa a conversar com outras ferramentas, outros ambientes e outras superfícies. Extensibilidade, neste repositório, não é um plugin system isolado. Ela é um conjunto de mecanismos que permitem consumir capacidades externas, expor o próprio runtime, integrar interfaces remotas e adicionar comportamentos compostos.

O ponto arquitetural mais importante é que essas extensões não pairam acima do produto; elas entram no mesmo pipeline de tools, permissões, estado e observabilidade. Isso é o que impede que extensibilidade vire um buraco paralelo sem governança.

## Arquivos-chave desta seção

| Arquivo ou pasta | Papel |
|---|---|
| `src/bridge/bridgeMain.ts` | Loop principal do controle remoto e ambiente bridge |
| `src/services/mcp/client.ts` | Cliente MCP com múltiplos transportes, auth e cache de conexão |
| `src/entrypoints/mcp.ts` e `mcp-server/` | Exposição do produto como servidor MCP |
| `src/plugins/` e `src/services/plugins/` | Loader, registro e ciclo de vida de plugins |
| `src/skills/` | Skills embutidas e carregadas dinamicamente |
| `bun:bundle` + feature flags | Corte de builds e ativação progressiva de subsistemas |

## Questão arquitetural

Como abrir o sistema para fora sem perder o controle do núcleo? O projeto responde mantendo as extensões acopladas ao mesmo regime de ferramentas, políticas e estado. Em outras palavras, ele não cria um “modo plugin” solto; ele injeta novas capacidades em contratos já existentes.
