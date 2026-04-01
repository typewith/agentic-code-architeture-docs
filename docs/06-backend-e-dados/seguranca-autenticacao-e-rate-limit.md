# Segurança, Autenticação e Rate Limit

Quando o agente sai do terminal local e vira serviço, segurança deixa de ser detalhe operacional e passa a moldar a arquitetura. O diretório `src/server/security/` mostra isso de forma direta. Há sandbox de comandos, validação de path, criptografia de chaves, sanitização, CSP, rate limiter e audit log. Isso indica que o time tratou a borda do backend como superfície de risco real, e não como mera conveniência para a web app.

## Sandbox de comando

`src/server/security/command-sandbox.ts` é um exemplo particularmente didático. Em vez de usar shell aberto, ele aplica allowlist de binários, denylist de padrões perigosos, `execFile` sem expansão de shell, remoção de variáveis sensíveis do ambiente, timeout e limite de saída. Isso não torna execução remota “segura por definição”, mas reduz bastante a superfície óbvia de abuso.

O ponto importante é que a segurança não depende só do modelo “se comportar”. O software assume que uma capacidade de execução precisa de contenção própria.

## Autenticação em camadas

O backend web em `src/server/web/pty-server.ts` suporta mais de um adapter de autenticação, incluindo token, OAuth e API key. Isso é um bom indicador de arquitetura orientada a produto, porque diferentes ambientes pedem relações de confiança diferentes. A abstração por adapter evita que o resto do servidor fique codificado em torno de um único provedor.

Do lado da API, middlewares como `requireAuth` e proteções por rota fazem a borda HTTP assumir responsabilidade de identidade antes de qualquer operação mais cara ou sensível. Isso é simples, mas é o tipo de disciplina que impede bugs de autorização de se espalharem.

## Rate limit como proteção do produto

Rate limit aparece em vários níveis. Há limitação por IP no proxy web, por usuário ou sessão em áreas do servidor e inclusive limitação de criação de sessões em `SessionManager`. Isso revela outra lição importante: em produtos agênticos, abuso pode vir tanto de volume de requests quanto de explosão de sessões ou execuções caras. Uma única régua global normalmente não basta.

## O que aprender

Arquiteturas de agente frequentemente falham porque confiam demais na camada “inteligente” e de menos na camada de contenção. O repositório estudado faz o oposto nas partes de backend: assume que autenticação, sandbox, validação e limites precisam ser explícitos e distribuídos ao longo da borda do sistema. É uma postura correta para qualquer produto que exponha tools e execução a múltiplos usuários.
