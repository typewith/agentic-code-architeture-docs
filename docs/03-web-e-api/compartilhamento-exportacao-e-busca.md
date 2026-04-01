# Compartilhamento, Exportação e Busca

Funcionalidades como exportar, compartilhar e buscar conversas costumam parecer secundárias quando se pensa apenas no “agente”. Na prática, elas são as features que transformam uma sessão em artefato de produto. Um sistema de código realmente útil não apenas responde; ele permite recuperar, circular e revisitar o que foi produzido.

No backend analisado, isso aparece na modelagem de `shared_links`, nos serviços de conversa com export em JSON, markdown e plaintext, nas rotas web para share e nas áreas de busca e analytics. A presença dessas capacidades mostra uma mudança de escopo importante: o produto não é mais apenas um assistente interativo, mas um sistema de conhecimento operacional.

## Exportação como desnormalização intencional

O método `exportConversation` em `src/server/api/services/conversation-service.ts` revela uma escolha simples, mas instrutiva. Internamente, mensagens e tool uses são mantidos em estrutura própria; externamente, o produto consegue materializar isso em formatos mais consumíveis. Essa desnormalização é valiosa porque cada consumidor quer uma superfície diferente: a UI precisa de estrutura, o usuário humano muitas vezes quer markdown, e integrações podem preferir JSON.

Arquiteturalmente, isso mostra que nem todo modelo interno deve ser exposto diretamente. A exportação funciona como tradução entre domínio operacional e artefato de consumo.

## Compartilhamento como preocupação de produto

Quando o schema inclui `shared_links`, `accessLevel`, `passwordHash`, `expiresAt` e `viewCount`, o sistema está reconhecendo que conversa é também objeto compartilhável. Isso muda várias coisas. Passa a existir preocupação com revogação, tempo de vida, nível de acesso e auditoria de visualização. Em outras palavras, uma simples “feature de share” arrasta decisões de segurança e modelo de dados.

Esse é um bom ponto de aprendizado: em produtos agênticos, qualquer mecanismo que tire a conversa do contexto privado da sessão precisa ser tratado como decisão de plataforma, não como detalhe de UI.

## Busca e indexação

As rotas e serviços de busca mostram outra camada de valor. Assim que há muitas conversas, sessões ou artefatos, o sistema precisa permitir recuperação por termos, metadados ou contexto. A busca deixa de ser conveniência e vira ferramenta de memória operacional do usuário e da equipe.

Isso também dialoga com o restante da arquitetura. Não faz sentido investir em persistência, exportação e links compartilháveis se depois tudo fica opaco. Busca fecha o ciclo entre geração, armazenamento e reutilização.

## O que observar

Esta parte do sistema é importante porque expõe um padrão recorrente: o agente começa como runtime de execução, mas rapidamente precisa virar sistema documental. Quem projeta um produto semelhante precisa pensar cedo em como transcripts, resultados, custos, aprovações e outputs serão armazenados, buscados e compartilhados, porque esses requisitos aparecem muito antes do que parece.
