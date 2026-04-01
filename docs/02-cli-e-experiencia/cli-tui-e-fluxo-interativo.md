# CLI, TUI e Fluxo Interativo

O arquivo `src/entrypoints/cli.tsx` mostra que o boot da CLI foi desenhado com muita atenção a custo de inicialização. Em vez de carregar imediatamente todo o runtime, ele testa argumentos e flags para decidir se pode seguir por um fast path. Isso vale para `--version`, dump de system prompt, bridge, daemon, sessões em background e outras rotas especiais. O motivo é simples: em um produto desse porte, importar cedo demais todos os módulos do ecossistema agêntico encarece tanto o tempo de resposta quanto a complexidade mental do startup.

Essa escolha é arquitetural, não cosmética. O entrypoint funciona como um roteador de modos de execução. O sistema deixa explícito que “rodar Claude Code” pode significar várias coisas diferentes, e cada uma delas merece um caminho mínimo de inicialização. Em muitos CLIs, tudo cai no mesmo bootstrap monolítico; aqui, o código tenta preservar separação de trajetórias desde a primeira instrução.

## Do comando digitado até a sessão

Depois que o entrypoint identifica que está no caminho interativo padrão, o controle passa por `src/main.tsx` e `src/replLauncher.tsx`. A partir daí, o produto começa a parecer menos um utilitário de linha de comando e mais uma aplicação React. O REPL é montado em `src/screens/REPL.tsx`, as partes da interface vivem em `src/components/`, e o comportamento interativo fica espalhado por hooks de input, status, permissões, navegação e integração.

Esse desenho resolve um problema importante: a sessão precisa reagir continuamente a eventos assíncronos. O agente pode começar a streamar tokens, pedir aprovação para tools, exibir progresso de subagentes, receber mensagens de tasks em background, atualizar footers e exibir notificações ao mesmo tempo. Um loop procedural simples de terminal teria dificuldade para modelar isso de forma previsível; a abordagem reativa em Ink encaixa melhor.

<div class="diagram">
  <div class="diagram__header">Fluxo interativo da CLI</div>
  <div class="diagram__body">
    <div class="diagram-flow">
      <div class="diagram-flow__step">
        <p class="diagram-card__title">Entrada do processo</p>
        <p class="diagram-card__meta">`src/entrypoints/cli.tsx` escolhe fast path ou caminho REPL.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">Bootstrap</p>
        <p class="diagram-card__meta">`src/main.tsx` prepara config, estado, modelo, integrações e renderização.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">Tela principal</p>
        <p class="diagram-card__meta">`src/screens/REPL.tsx` conecta input, transcript, painéis, permissões e comandos.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">Loop agêntico</p>
        <p class="diagram-card__meta">A UI entrega input ao query engine e renderiza incrementalmente tudo o que volta dele.</p>
      </div>
    </div>
  </div>
</div>

## A TUI como observadora e mediadora

Uma boa TUI agêntica não serve apenas para desenhar texto na tela. Ela também medeia a relação entre autonomia e controle. Quando a ferramenta pede aprovação, quando uma task termina, quando um subagente produz resultado ou quando um comando local altera o estado da sessão, a TUI precisa refletir isso sem interromper o usuário de forma caótica. É por isso que AppState, hooks e componentes não são acessórios de UI; eles são parte do contrato operacional do produto.

Essa função mediadora aparece ainda mais claramente quando a sessão não está sozinha. O estado global inclui tasks, mcp clients, plugins, notificações, footer pills, bridge status, teammates, bagel/webbrowser state e outros sinais. Em outras palavras, a sessão não representa apenas uma conversa; ela representa um ambiente vivo no qual várias entidades podem estar produzindo eventos.

## Por que React + Ink faz sentido aqui

Usar React no terminal pode parecer exagero à primeira vista, mas o código mostra o contrário. O sistema precisa compor visualizações, manter seleção em painéis, reagir a eventos concorrentes, encapsular comportamento em hooks e reutilizar componentes entre estados diferentes da sessão. Tudo isso se encaixa naturalmente em uma abordagem declarativa.

O ganho maior não é “ficar moderno”; é evitar que a UI se transforme em uma máquina de estados manual com centenas de condicionais espalhadas. Em um produto onde a conversa pode ser simultaneamente transcript, prompt, task monitor, session bridge e painel de aprovação, a modelagem declarativa ajuda a limitar o caos.

## Limites e tensões

O custo dessa escolha é que a CLI deixa de ser leve em termos conceituais. Há mais componentes, mais hooks e mais estado para acompanhar. Além disso, como o terminal é também o lugar onde muita lógica de produto se materializa, o risco de acoplamento entre UI e runtime cresce com o tempo. A presença de arquivos muito grandes em `src/main.tsx` e o volume de estados em `AppState` são sinais de que essa tensão existe.

Ainda assim, a arquitetura faz uma aposta coerente: aceitar uma camada de UI mais sofisticada em troca de uma experiência operacional mais controlada. Para um sistema agêntico de longa duração, isso é um tradeoff razoável.
