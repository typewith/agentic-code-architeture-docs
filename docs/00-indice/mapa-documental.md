# Mapa Documental

O mapa documental existe para mostrar como os arquivos desta base se relacionam entre si. A estrutura foi organizada para que cada seção tenha um documento de abertura, seguido por documentos de aprofundamento. A intenção é que o leitor tenha sempre um ponto de aterrissagem conceitual antes de entrar nos detalhes de implementação.

## Lógica de organização

Cada seção responde a uma pergunta arquitetural.

| Seção | Pergunta que a seção responde |
|---|---|
| `01-visao-geral` | Que tipo de sistema é este e quais camadas o sustentam? |
| `02-cli-e-experiencia` | Como a interface terminal é montada e como o usuário interage com o loop agêntico? |
| `03-web-e-api` | Como a experiência de browser conversa com backend, PTY e streaming? |
| `04-extensibilidade` | Como o sistema consome e expõe capacidades externas? |
| `05-agentes-e-contexto` | Como o sistema controla memória, permissões, tarefas e coordenação? |
| `06-backend-e-dados` | Como dados, autenticação, segurança e rotas são estruturados? |
| `07-operacao` | Como build, deploy e observabilidade fecham o produto? |
| `08-avaliacao` | O que este código ensina e onde ele mostra tensão arquitetural? |
| `09-referencias` | Como voltar às fontes, conceitos e módulos-chave? |

## Padrão adotado para as seções

As seções `02` a `08` abrem com `00-guia-da-secao.md`. Esse arquivo introdutório não substitui os deep dives; ele os enquadra. Em um sistema muito amplo, esse nível intermediário é importante porque impede que o leitor caia direto em detalhes de implementação sem entender qual problema estrutural aquela parte resolve.

Cada documento aprofundado segue, tanto quanto possível, o mesmo esqueleto editorial:

1. O que o subsistema é e qual responsabilidade ele assume.
2. Como ele funciona por dentro, com foco em fluxo e estado.
3. Por que a decisão arquitetural faz sentido naquele contexto.
4. Quais limites, riscos ou acoplamentos ele introduz.
5. Quais arquivos valem leitura direta no repositório-fonte.

## Relação entre documentos e código-fonte

Os documentos não foram escritos a partir de README ou marketing do projeto. Eles foram orientados por código. Isso significa que o mapa documental também serve como mapa de navegação do repositório de referência.

| Tema | Módulos mais citados |
|---|---|
| Boot e CLI | `src/entrypoints/cli.tsx`, `src/main.tsx`, `src/replLauncher.tsx`, `src/commands.ts` |
| Loop agêntico | `src/query.ts`, `src/QueryEngine.ts`, `src/services/api/claude.ts`, `src/services/tools/toolOrchestration.ts` |
| Tools e permissões | `src/tools.ts`, `src/Tool.ts`, `src/utils/permissions/permissionSetup.ts` |
| Memória e contexto | `src/memdir/`, `src/services/compact/`, `src/utils/messages.ts` |
| Tarefas e multiagente | `src/tasks/`, `src/tools/AgentTool/`, `src/coordinator/` |
| Extensibilidade | `src/services/mcp/`, `src/bridge/`, `src/plugins/`, `src/skills/` |
| Web e backend | `web/`, `src/server/api/`, `src/server/web/`, `src/server/db/` |
| Operação | `Dockerfile`, `helm/`, `grafana/`, `src/server/observability/` |

## Como usar este mapa para estudo

Se você estiver aprendendo arquitetura de agentes, use o mapa documental como uma progressão de abstração. Comece em camadas altas e só desça para rotas, schemas ou classes específicas quando já souber qual papel elas cumprem no todo. Essa disciplina importa porque o código deste repositório tem muitas superfícies e muitas feature flags; sem uma leitura guiada, é fácil confundir código estrutural com código opcional ou experimental.

Se você estiver usando esta documentação para projetar um sistema semelhante, o valor maior não está em copiar nomes de diretório, mas em perceber os recortes que o projeto faz. A pergunta correta nunca é “devo ter uma pasta `bridge`?”, e sim “em que ponto uma integração remota deixa de ser detalhe de interface e vira subsistema próprio?”. O mapa documental foi desenhado para favorecer esse tipo de leitura.
