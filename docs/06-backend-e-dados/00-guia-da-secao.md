# Guia da Seção: Backend e Dados

Esta seção cobre o momento em que o sistema assume responsabilidades clássicas de backend: servir rotas, autenticar usuários, validar payloads, modelar entidades persistentes, limitar abuso, registrar auditoria e medir operação. Em outras palavras, é aqui que a plataforma de agente deixa de ser apenas runtime local e passa a se comportar como serviço multiusuário.

O repositório tem dois eixos principais nessa área. O primeiro é a API em `src/server/api/`, focada em conversas, SSE, arquivos, execução e administração. O segundo é o servidor web/PTy em `src/server/web/`, orientado a sessões remotas, WebSocket e autenticação operacional. Ambos dependem de modelagem, segurança e observabilidade que aparecem no restante de `src/server/`.

## Arquivos-chave

| Arquivo ou pasta | Papel |
|---|---|
| `src/server/api/index.ts` | Composição do backend REST + SSE |
| `src/server/api/routes/` | Contratos HTTP para conversas, arquivos, exec, busca, settings e admin |
| `src/server/db/schema/` | Modelagem relacional para SQLite e Postgres |
| `src/server/security/` | Sandbox, validação de paths, rate limiter, audit log e sanitização |
| `src/server/auth/` e `src/server/web/auth/` | Estratégias de autenticação e middleware |
| `src/server/observability/` | Métricas, logger, saúde, Sentry e scrubber |
