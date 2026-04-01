# Guia da Seção: CLI e Experiência

Esta seção explica a superfície mais importante do produto: a experiência terminal. Em um sistema parecido com Claude Code, o terminal não é apenas uma casca de entrada. Ele é uma interface reativa, um painel de governança, um multiplexador de comandos locais e um front-end para um loop agêntico que pode executar dezenas de iterações e tools em uma única solicitação.

Ler a CLI apenas como “o lugar onde o usuário digita prompts” é perder a maior parte do desenho. O que torna essa superfície interessante é justamente a forma como ela combina quatro papéis: boot e inicialização, UI interativa, despacho de comandos e observação contínua do estado do agente.

<div class="diagram">
  <div class="diagram__header">O que esta seção cobre</div>
  <div class="diagram__body">
    <div class="diagram-grid">
      <div class="diagram-card diagram-card--accent">
        <p class="diagram-card__title">Boot e fast paths</p>
        <p class="diagram-card__meta">Como `src/entrypoints/cli.tsx` separa caminhos rápidos e evita carregar o mundo inteiro para tarefas simples.</p>
      </div>
      <div class="diagram-card diagram-card--accent">
        <p class="diagram-card__title">REPL e renderização</p>
        <p class="diagram-card__meta">Como React + Ink sustentam uma UI de terminal com componentes, hooks e painéis de estado.</p>
      </div>
      <div class="diagram-card diagram-card--accent">
        <p class="diagram-card__title">Comandos e modos</p>
        <p class="diagram-card__meta">Como slash commands convivem com prompts normais, modo plano, modo rápido e rotas especializadas.</p>
      </div>
      <div class="diagram-card diagram-card--accent">
        <p class="diagram-card__title">Ferramentas visíveis ao usuário</p>
        <p class="diagram-card__meta">Como a UI apresenta execução de tools, aprovações, progresso e resultados de subagentes.</p>
      </div>
    </div>
  </div>
</div>

## Arquivos-chave desta seção

| Arquivo ou pasta | Papel |
|---|---|
| `src/entrypoints/cli.tsx` | Seleciona fast paths, delega para bridge, daemon, bg sessions e boot completo |
| `src/main.tsx` | Consolida bootstrap do app interativo e muita configuração da sessão |
| `src/replLauncher.tsx` | Faz a ponte entre bootstrap e a tela principal |
| `src/screens/REPL.tsx` | Define a experiência conversacional central |
| `src/commands.ts` e `src/commands/` | Registram slash commands e separam comportamentos locais de prompts |
| `src/components/` e `src/hooks/` | Montam a UI reativa do terminal |

## Pergunta arquitetural principal

Como oferecer uma experiência que pareça imediata para o usuário, sem esconder que por trás dela existe um runtime bastante complexo? A resposta do projeto foi tratar a CLI como aplicação de produto, não como utilitário tradicional. Isso permite ter indicadores de estado, telas dedicadas, painéis de task, permissões interativas, integrações com bridge e transições entre modos sem abandonar a metáfora do terminal.

## Como estudar os próximos documentos

Comece por `cli-tui-e-fluxo-interativo.md` se quiser entender o caminho do processo desde o comando digitado até a renderização da sessão. Depois leia `comandos-e-modos-operacionais.md` para ver como o produto organiza intenções diferentes sem explodir a complexidade da interface. Feche com `ferramentas-do-agente-e-governanca.md`, onde o foco deixa de ser a casca visual e passa a ser o contrato entre usuário, modelo e execução real.
