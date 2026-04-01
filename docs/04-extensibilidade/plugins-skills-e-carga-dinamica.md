# Plugins, Skills e Carga Dinâmica

O ecossistema em `src/plugins/` e `src/skills/` mostra duas formas diferentes de estender o produto. Plugins ampliam a plataforma com novos comandos, integrações e possivelmente novas fontes de capacidade. Skills empacotam workflows, instruções e convenções reutilizáveis para tarefas recorrentes. Embora pareçam semelhantes à primeira vista, eles ocupam níveis diferentes de abstração.

Skills ficam mais próximas do comportamento do agente. Elas organizam prompt, orientação operacional e, às vezes, descoberta de capabilities específicas. Plugins ficam mais próximos do produto enquanto plataforma, influenciando o conjunto de comandos, de integrações e do que precisa ser carregado no ambiente.

## Carga dinâmica e custo estrutural

O repositório usa bastante lazy loading e feature flags. Isso aparece tanto no registro de comandos quanto no de tools. O motivo é pragmático: carregar todos os módulos potenciais sempre seria caro e ainda criaria dependências desnecessárias em builds mais enxutos. A carga dinâmica funciona, então, como mecanismo de custo e de isolamento.

Mas há um segundo motivo mais arquitetural. Quando plugins e skills podem mudar o comportamento disponível em runtime, o sistema precisa de pontos claros de montagem. `src/commands.ts`, `src/tools.ts`, loaders de plugin e registries de skills cumprem justamente esse papel. Eles são os locais onde o produto recompõe “o que existe nesta sessão”.

## O que os plugins ensinam

Plugins mostram como uma plataforma precisa de fronteiras explícitas para evitar extensão caótica. Se toda capacidade nova pudesse entrar em qualquer camada, seria impossível manter previsibilidade. O loader de plugins, os caches de comandos e a necessidade de refresh deixam claro que extensibilidade produtiva exige governança de ciclo de vida.

## O que as skills ensinam

Skills mostram que nem toda extensibilidade é código novo. Em sistemas agênticos, parte da extensibilidade está em transformar conhecimento operacional em artefato reutilizável. Isso é poderoso porque permite elevar o nível de abstração do usuário sem necessariamente expandir o kernel do runtime.

## Feature flags como mecanismo de produto

As flags em `bun:bundle` têm papel duplo. Elas fazem dead-code elimination e permitem rollout seletivo. Isso ajuda a manter builds diferentes, separar funcionalidades internas e experimentar subsistemas como bridge, proactive, workflows, voice ou coordinator sem forçar ativação universal.

Ao mesmo tempo, esse mecanismo tem custo: toda flag adicional aumenta o número de sistemas possíveis que o código pode representar. A arquitetura aguenta isso melhor quando os pontos de montagem são claros. É exatamente por isso que plugins, skills e flags precisam ser lidos juntos, e não como recursos independentes.
