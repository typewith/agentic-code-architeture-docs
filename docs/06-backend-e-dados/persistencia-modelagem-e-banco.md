# Persistência, Modelagem e Banco

O repositório usa persistência em mais de uma forma, mas quando entra no domínio de produto web/backend ele converge para modelagem explícita com Drizzle. Os schemas em `src/server/db/schema/sqlite.ts` e `src/server/db/schema/postgres.ts` mostram uma tentativa clara de manter o mesmo domínio em dois bancos diferentes, respeitando diferenças de tipo e capacidade.

As entidades principais são `users`, `conversations`, `messages`, `tool_uses`, `sessions` e `shared_links`. Esse conjunto é didático porque captura exatamente as peças que um produto agêntico precisa transformar em domínio persistente: identidade, conversa, eventos internos da conversa, autenticação/sessão e artefatos compartilháveis.

## Por que a modelagem importa tanto aqui

Uma conversa agêntica não é só texto. Ela tem modelo usado, tokens de entrada e saída, duração, stop reason, sequência temporal, tool uses associados e potencial de exportação ou share. Se o backend reduz tudo a blob opaco demais, perde capacidade analítica. Se normaliza demais, corre o risco de tornar a evolução do produto lenta e custosa. O schema atual tenta ficar no meio: estrutura suficiente para operação e analytics, sem modelar cada detalhe como tabela própria.

Isso aparece, por exemplo, nos campos JSON para `preferences`, `tags`, `metadata`, `content`, `input` e `output`. É uma escolha pragmática. Em vez de explodir a modelagem relacional para acompanhar cada variante do conteúdo, o sistema mantém certos campos flexíveis e estrutura o que realmente precisa ser consultado ou correlacionado com frequência.

## SQLite e Postgres como sinais de contexto

O suporte a SQLite e Postgres sugere dois cenários de uso. SQLite atende bem desenvolvimento local, ambientes simples e distribuição leve. Postgres abre espaço para operação mais séria, concorrência e integração com infraestrutura compartilhada. A arquitetura se beneficia disso porque não força um único modo de operação desde o início.

Ao mesmo tempo, essa dualidade aumenta o custo de manutenção. Cada divergência entre engines precisa ser compensada por schema paralelo, testes e convenções de serialização. É um tradeoff típico de produtos que querem servir tanto dev local quanto backend implantado.

## O que aprender

Persistência boa para agentes não é nem puramente documental nem puramente relacional. O que o repositório mostra é uma mistura orientada ao uso: estrutura para o que precisa ser consultado e operado, flexibilidade para o que varia muito com a evolução do produto.
