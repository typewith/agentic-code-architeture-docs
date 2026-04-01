# Setup, Build e Execução Local

O repositório usa Bun como runtime e como base do fluxo de build. Isso aparece nos scripts de `package.json`, nos builders para CLI e web e no próprio Dockerfile. Essa escolha reduz atrito para rodar TypeScript/TSX e facilita um pipeline de build mais direto, mas também cria uma dependência explícita do ecossistema Bun para desenvolvimento e distribuição.

## Build como múltiplos produtos

Os scripts mostram que o sistema não gera um único artefato. Há build do bundle principal, variantes watch, build do web, typecheck, lint, pacote npm e migrações de banco. Isso reflete um ponto arquitetural importante: o repositório abriga um conjunto de produtos relacionados, não apenas uma aplicação binária. Há CLI, web, backend e MCP convivendo no mesmo código-base.

Essa multiplicidade exige disciplina de setup. Cada parte precisa ter contrato claro de entrada e saída; caso contrário, o processo de build vira um amálgama frágil de comandos encadeados.

## Execução local como ferramenta de estudo

Rodar o sistema localmente não serve só para “ver funcionar”. Em arquiteturas agênticas, a execução local é também forma de entender latência, estado, aprovações, transcript e acoplamentos entre módulos. Por isso o setup precisa ser previsível: instalar dependências, configurar variáveis, subir API/web quando necessário e manter um caminho simples para o CLI principal.

O valor didático aqui é perceber que a execução local já antecipa quase todos os temas de arquitetura: permissões, contexto, storage, tools e streaming aparecem cedo.
