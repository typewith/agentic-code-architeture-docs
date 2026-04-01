# Backend, Serviços e Rotas

`src/server/api/index.ts` mostra um backend relativamente convencional em Express, mas a simplicidade aparente engana. As rotas não são só wrappers finos de banco. Elas fazem ponte entre um protocolo HTTP tradicional e um runtime agêntico orientado a streaming, tools e sessões. Essa tradução é o verdadeiro papel arquitetural da camada de serviços.

O arquivo monta middlewares de CORS, request ID, logging e tratamento de erro, registra rotas específicas e preserva um endpoint `/api/chat` compatível com clientes mais antigos. Isso já diz bastante sobre a maturidade do sistema: o backend não serve apenas o presente; ele também administra legado e contratos de transição.

## Rotas como fronteiras explícitas

Os routers em `src/server/api/routes/` deixam as responsabilidades relativamente claras. `conversations.ts` cuida de CRUD e streaming de mensagens por conversa. `files.ts` e `exec.ts` expõem capacidades controladas sobre o filesystem e a execução. `settings.ts`, `mcp.ts`, `search.ts` e `admin.ts` completam o conjunto de preocupações de produto.

Essa separação é importante porque impede que a lógica de produto fique concentrada em um único arquivo enorme de servidor. Quando as fronteiras de rota são claras, fica mais fácil pensar em autorização, rate limiting, validação e observabilidade por domínio.

## Serviços como camada intermediária

`conversation-service.ts` é um bom exemplo de serviço intermediário. Ele encapsula CRUD, exportação, preview, atualização e relacionamento com messages e tool uses. A rota delega para o serviço em vez de operar diretamente sobre o storage. Isso é saudável porque permite mudar implementação e manter o contrato HTTP mais estável.

Esse padrão importa especialmente em produtos agênticos, onde a evolução costuma ser rápida. Se a lógica de rota conhecer detalhes demais de persistência ou de execução do agente, qualquer mudança estrutural vaza imediatamente para a borda.

## A borda HTTP precisa ser determinística

Outro mérito é o uso de Zod nas entradas, principalmente em conversas. O backend tenta fazer a parte imprevisível do sistema começar apenas depois que o payload foi validado, autenticado e limitado. Isso reduz o risco de transformar inputs inconsistentes em falhas mais profundas e difíceis de depurar.

Em produtos de agente, essa disciplina é essencial. Não basta confiar que “o front-end sempre manda certo”, porque logo outras integrações aparecem.
