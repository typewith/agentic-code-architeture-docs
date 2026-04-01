# Guia da Seção: Web e API

Esta seção cobre a transformação do sistema em produto acessível por browser e serviços HTTP. O ponto central aqui é que o projeto não simplesmente “portou a CLI para a web”. Ele passou a operar com pelo menos duas camadas complementares: uma aplicação web em `web/` e um backend dividido entre API unificada e servidor de sessões PTY em `src/server/`.

Esse desenho importa porque a web introduz problemas que a CLI local não precisa resolver do mesmo jeito: autenticação, proxy seguro de API keys, rate limiting por IP ou usuário, sessões reconectáveis, compartilhamento, exportação e observabilidade operacional. A leitura desta seção mostra como essas preocupações mudam a topologia do sistema.

## Arquivos-chave desta seção

| Arquivo ou pasta | Papel |
|---|---|
| `web/app/api/chat/route.ts` | Proxy controlado entre front-end Next.js e backend real |
| `web/components/` | Interface browser, chat, auth, analytics e componentes adaptados |
| `src/server/api/index.ts` | API REST + SSE para conversas, arquivos, execução, MCP e administração |
| `src/server/api/routes/conversations.ts` | CRUD e streaming por conversa |
| `src/server/web/pty-server.ts` | Sessões PTY sobre WebSocket para terminal remoto |
| `src/server/web/session-manager.ts` | Controle de capacidade, reconexão e limites por usuário |

## Pergunta arquitetural principal

Como expor a experiência agêntica em um ambiente de browser sem perder controle sobre segurança, streaming e estado de sessão? O projeto responde isso separando frontend, API e PTY server em vez de tentar fazer tudo em uma única camada web.

## Ordem sugerida de leitura

Comece com `web-app-e-experiencia-browser.md` para entender a fronteira entre front-end e backend. Depois leia `api-rest-sse-e-streaming.md`, que é onde o protocolo de produto realmente aparece. Feche com `compartilhamento-exportacao-e-busca.md`, onde ficam as capacidades derivadas que transformam uma conversa em objeto de produto compartilhável e pesquisável.
