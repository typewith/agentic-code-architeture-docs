# Web App e Experiência Browser

O diretório `web/` mostra que a experiência browser foi pensada como produto próprio, e não como renderização simplificada do terminal. Há rotas Next.js, componentes de autenticação, analytics, chat, páginas de compartilhamento e vários handlers de API. Ao mesmo tempo, a web não tenta incorporar todo o runtime do agente dentro do front-end. Em vez disso, ela funciona como interface e proxy controlado para os serviços reais.

O arquivo `web/app/api/chat/route.ts` é um exemplo claro dessa fronteira. Ele aplica rate limiting por IP, mantém `ANTHROPIC_API_KEY` no lado servidor e repassa a requisição para o backend configurado em `NEXT_PUBLIC_API_URL`. Isso ensina uma regra importante para produtos agênticos web: a UI do browser pode ser rica, mas não deve virar ponto de exposição indiscriminada de credenciais ou lógica sensível.

## Front-end como superfície adaptada

Os componentes em `web/components/` mostram outra característica interessante. Em vez de fingir que browser e terminal são idênticos, o projeto cria versões adaptadas de mensagens, markdown, prompt input, settings, diff e status line. Isso é uma boa decisão arquitetural porque reconhece que a mesma semântica de produto precisa de representações diferentes dependendo da superfície.

Essa adaptação também evita o erro oposto: duplicar completamente o domínio. O front-end browser usa outra linguagem visual, mas continua falando com o mesmo backend de conversa, execução e estado. Em outras palavras, a superfície muda, o núcleo não deveria mudar.

## Sessão web não é apenas HTTP

Quando o produto quer oferecer algo mais próximo de um terminal remoto, entra o servidor em `src/server/web/pty-server.ts`. Ele sobe um servidor Express com WebSocket, autenticação, store de usuários, Sentry, Prometheus e `SessionManager` para criar, retomar e destruir sessões PTY. Isso representa uma segunda modalidade de experiência browser: não mais um chat puro em HTTP, mas uma sessão viva com scrollback, reconexão e limites por usuário.

Essa coexistência de chat web e PTY remoto é arquiteturalmente relevante. Ela mostra que o produto diferencia uma conversa “de API” de uma sessão “de terminal hospedado”. Misturar as duas seria mais simples no curto prazo, mas pioraria bastante a clareza dos contratos de runtime.

## O que a experiência browser exige a mais

No browser, o sistema precisa se preocupar com origem permitida, adapters de autenticação, proteção de endpoints administrativos, streaming sem buffering, compatibilidade com infraestrutura como Vercel e limites por IP ou usuário. Esses aspectos aparecem espalhados entre `web/app/api/*`, `src/server/web/`, `src/server/auth/` e `src/server/security/`.

Esse é um bom lembrete de produto: quando um agente sai da máquina local e entra em ambiente multiusuário, a arquitetura muda de natureza. O problema deixa de ser apenas “como conversar com o modelo” e passa a incluir “como isolar usuários, sessões e chaves em uma superfície pública”.
