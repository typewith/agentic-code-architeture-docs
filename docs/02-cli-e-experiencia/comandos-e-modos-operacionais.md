# Comandos e Modos Operacionais

O arquivo `src/commands.ts` revela um ponto importante do design: o produto não reduz toda interação a “mensagem enviada ao modelo”. Há uma gramática operacional própria, composta por slash commands, comandos puramente locais, comandos que retornam JSX, comandos que montam prompts para o modelo e comandos condicionados por feature flags. Essa distinção é o que permite que a interface seja rica sem obrigar o modelo a intermediar tudo.

Arquiteturalmente, isso é valioso por dois motivos. Primeiro, preserva latência e previsibilidade para operações que não precisam do modelo, como exibir configuração, abrir diagnósticos ou trocar tema. Segundo, permite especializar intenções recorrentes, como review, compactação, memory, tasks ou bridge, sem forçar o usuário a reexplicar o que quer em linguagem natural toda vez.

## Tipos de comando

Há pelo menos três famílias relevantes no registro de comandos. Os `PromptCommand` traduzem uma intenção do usuário em prompt estruturado e frequentemente direcionado a certas tools. Os `LocalCommand` executam comportamento em processo e retornam texto simples. Os `LocalJSXCommand` retornam elementos React e por isso conseguem abrir telas e fluxos mais sofisticados, como diagnósticos e instaladores.

Essa taxonomia é uma decisão muito boa porque respeita a natureza do problema. Nem tudo é raciocínio do modelo; parte do produto é software determinístico tradicional. Misturar tudo no mesmo pipeline faria o sistema parecer mais “mágico”, mas também mais frágil, mais caro e mais lento.

## Modos operacionais

Além dos comandos, o produto trabalha com modos. Alguns afetam o ciclo da conversa, outros afetam governança e outros mudam a forma como o runtime é iniciado. O modo plano, o modo rápido, o uso de bridge, o daemon, sessões em background e vários caminhos feature-gated aparecem distribuídos entre `src/entrypoints/cli.tsx`, `src/main.tsx`, permissões e commands.

O que importa aqui é que o sistema não trata modo como mero detalhe visual. Um modo operacional muda expectativas de autonomia, de aprovação, de latência e até de topologia do processo. Por isso, ele precisa ser definido perto do boot e refletido até a camada de tools.

## Slash commands como DSL de produto

Uma forma útil de enxergar `src/commands.ts` é pensar nele como uma pequena DSL do produto. Quando o usuário digita `/review`, `/memory`, `/tasks`, `/mcp` ou `/config`, ele não está apenas chamando uma função; ele está ativando um fluxo de intenção codificado pelo time do produto. Isso é relevante em sistemas agênticos porque reduz a ambiguidade de linguagem natural para tarefas recorrentes e de alto impacto.

Essa DSL também serve como mecanismo de descoberta. Em vez de exigir que o usuário conheça toda a arquitetura interna, o sistema oferece verbos explícitos que organizam as capacidades mais importantes. O comando vira uma espécie de API humana para o runtime.

## Feature flags e custo de expansão

O registro de comandos também deixa visível o custo do crescimento do produto. Há importações condicionais para bridge, proactive, workflows, voice, peers, buddy, torch e várias áreas internas. Isso mostra uma arquitetura preparada para builds diferentes e rollout gradual, mas também deixa claro como o acúmulo de flags aumenta a superfície mental de manutenção.

Esse é um dos lugares em que o repositório mais ensina sobre evolução de produto. A expansão não acontece apenas pela adição de código; ela acontece pela multiplicação de modos, comandos e variantes. O mérito do desenho atual é centralizar a maior parte disso em um registro coerente, em vez de espalhar essas decisões pelo sistema inteiro.

## O que observar ao ler os comandos

Ao estudar um comando específico, vale sempre fazer quatro perguntas. Que intenção ele encapsula? Ele roda localmente ou precisa do modelo? Quais tools ele habilita ou incentiva? E que parte do estado da sessão ele altera? Essas perguntas transformam uma leitura de catálogo em leitura arquitetural.

Se a resposta para essas perguntas estiver difusa, o comando provavelmente está acoplado demais. Se estiver clara, o comando está funcionando como uma boa fronteira entre produto e runtime.
