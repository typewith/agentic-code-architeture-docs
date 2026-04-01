# Bridge, Remoto e Integrações

`src/bridge/bridgeMain.ts` é um dos melhores lugares para perceber quando uma feature deixa de ser “integração” e vira subsistema. O bridge não é uma camada fina que repassa mensagens. Ele administra ambiente remoto, autenticação, heartbeat, poll loop, backoff, spawn de sessões, worktrees, timeouts e cleanup. Isso já o coloca na categoria de infraestrutura de sessão, não de simples conector.

O valor dessa arquitetura é permitir que uma sessão local seja controlada por outra superfície sem reescrever o motor do agente. O bridge reaproveita o núcleo, mas precisa cercá-lo de garantias adicionais porque agora há uma separação real entre onde a sessão roda e onde ela é observada ou acionada.

## Por que o bridge é complexo

A leitura de `bridgeMain.ts` deixa claro que integrar controle remoto não é somente “abrir uma porta”. O código lida com token refresh, reconexão, backoff, heartbeats e múltiplas sessões por ambiente, além de criar e remover worktrees temporários. Tudo isso existe porque um ambiente remoto precisa lidar com falhas de rede, expiração de credenciais e desalinhamento entre estado local e estado do serviço coordenador.

Esse tipo de complexidade é inevitável. O que a arquitetura faz de certo é isolar essa complexidade em um diretório próprio e manter o bridge como consumidor do runtime central, em vez de contaminar todo o resto do sistema com lógica remota.

## Integrações como segunda vida da sessão

O bridge ensina uma ideia importante: uma sessão de agente não precisa pertencer exclusivamente à interface em que nasceu. Ela pode ser observada, reencaminhada ou orquestrada a partir de outra superfície. Isso abre espaço para IDEs, dashboards remotos, handoff entre dispositivos e automações centralizadas.

Mas essa mesma ideia cobra disciplina. Uma sessão que pode ser controlada remotamente precisa ter identidade forte, políticas claras e fronteiras de trust bem definidas. O código de bridge mostra exatamente isso ao trabalhar com environment IDs, session IDs compatíveis, trusted device tokens e validadores de capacidade.

## O que aprender

Se você estiver desenhando um sistema semelhante, a lição principal é que integração remota deve ser tratada como topologia de execução. Não é só transporte de mensagem; é modelo de sessão distribuída. Isso muda requisitos de segurança, reconexão, observabilidade e isolamento de workspace.
