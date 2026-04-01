# Glossário

## Agente principal

A instância que conduz a sessão corrente, recebe o prompt do usuário, conversa com o query loop e decide quando usar tools ou delegar trabalho.

## Async generator

Padrão usado em `src/query.ts` para produzir eventos incrementais ao longo do tempo, em vez de esperar um resultado final único. É o formato que melhor representa streaming e tool loops.

## Bridge

Subsistema em `src/bridge/` que conecta a sessão local a uma superfície remota controlada, cuidando de autenticação, heartbeat, backoff e spawn de sessões.

## Compactação

Processo de reduzir o volume de contexto carregado para o modelo sem perder a parte estrutural da conversa. Aparece em mecanismos automáticos e reativos do query loop.

## Feature flag

Chave que habilita ou remove partes do produto em build ou runtime. No repositório, muitas flags usam `bun:bundle` para eliminar código não necessário.

## MCP

Model Context Protocol. No contexto deste projeto, é tanto uma forma de consumir tools/resources externos quanto uma forma de expor o próprio sistema como servidor de capacidades.

## Memória persistente

Conjunto de arquivos em diretório, centrados em `MEMORY.md`, usado para guardar informações úteis entre conversas futuras.

## PTY

Pseudo-terminal. No servidor web, é a base para oferecer sessões remotas de terminal via WebSocket.

## Query loop

Núcleo iterativo da conversa agêntica. Recebe mensagens, chama o modelo, processa streaming, executa tools, incorpora resultados e decide se o turno continua.

## QueryEngine

Classe em `src/QueryEngine.ts` que encapsula o ciclo de vida da conversa e reaproveita o loop central em contextos headless e SDK.

## Skill

Artefato reutilizável de comportamento ou instrução operacional. Fica mais próximo do modo como o agente trabalha do que do modo como a plataforma é implantada.

## Subagente

Agente delegado a partir do principal para realizar parte de uma tarefa. No repositório, costuma ser modelado como task com estado, transcript e notificações.

## Tool

Capacidade formal que o agente pode solicitar ao runtime. Possui schema, política de permissão, semântica de concorrência e integração com transcript/UI.

## Transcript

Registro da trajetória conversacional da sessão, incluindo mensagens, outputs e sinais de execução. Não é a mesma coisa que memória persistente.

## TUI

Terminal User Interface. No projeto, a TUI é construída em React + Ink e atua como superfície interativa da sessão.
