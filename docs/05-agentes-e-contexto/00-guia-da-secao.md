# Guia da Seção: Agentes e Contexto

Esta é a seção mais próxima do núcleo operacional do produto. Ela cobre como o sistema decide, lembra, delega, pede permissão e continua coerente ao longo de uma conversa que pode durar muitos turnos, usar várias tools e até acionar múltiplos agentes paralelos.

Em um assistente simples, contexto costuma significar apenas “histórico da conversa”. Aqui, contexto é muito mais amplo: inclui mensagens normalizadas, memória persistente, anexos, estado de tasks, regras de permissão, compactação, budget de tokens e até sinais de atividade recente de tools. O mesmo vale para “agente”: o sistema trabalha com agente principal, subagentes, teammates in-process e tasks backgrounded.

## Pergunta arquitetural desta seção

Como preservar utilidade e segurança quando o agente deixa de ser uma resposta única e passa a ser um processo com memória, ferramentas, tarefas e continuidade?

## Arquivos-chave

| Arquivo ou pasta | Papel |
|---|---|
| `src/query.ts` | Loop central com recovery, compactação, tool results e transições |
| `src/QueryEngine.ts` | Encapsulamento do ciclo de vida da conversa |
| `src/memdir/` | Memória persistente em diretório e seleção contextual de memórias |
| `src/utils/permissions/permissionSetup.ts` | Composição de modos e regras de permissão |
| `src/tasks/` | Modelos de task local, teammate, shell e agente remoto |
| `src/state/AppState.tsx` e `src/state/AppStateStore.ts` | Estado vivo da sessão interativa |

## Ordem sugerida

Leia primeiro `configuracao-permissoes-e-politicas.md`, porque autonomia sem governança é leitura enganosa. Depois siga para `memoria-contexto-sessoes-e-compactacao.md`, onde o contexto real do agente aparece. Feche com `tarefas-subagentes-e-coordenacao.md`, que mostra como a arquitetura expande do agente único para execução paralela.
