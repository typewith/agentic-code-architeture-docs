# API REST, SSE e Streaming

`src/server/api/index.ts` é o ponto em que a arquitetura assume explicitamente a forma de backend de produto. Ele sobe um servidor Express, registra middleware global, monta rotas de saúde, conversas, arquivos, execução, settings, MCP, busca e administração, e ainda preserva compatibilidade com um endpoint `/api/chat` mais simples para o front-end existente. Esse detalhe de compatibilidade é importante: a evolução do produto não destruiu as integrações anteriores; ela foi absorvida pela camada de API.

O uso de SSE para streaming em `src/server/api/routes/conversations.ts` e no serviço de chat mostra outra decisão acertada. Para respostas longas e tool loops, o produto precisa entregar progresso incremental sem obrigar o cliente a esperar o término completo da iteração. SSE resolve isso com menos atrito que uma pilha WebSocket completa quando o problema é principalmente “stream de saída do servidor para o cliente”.

<div class="diagram">
  <div class="diagram__header">Caminho de uma mensagem via API</div>
  <div class="diagram__body">
    <div class="diagram-flow">
      <div class="diagram-flow__step">
        <p class="diagram-card__title">Cliente</p>
        <p class="diagram-card__meta">Envia POST para `/api/conversations/:id/messages` ou `/api/chat`.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">API</p>
        <p class="diagram-card__meta">Autentica, aplica rate limit, valida payload com Zod e cria `SSEStream`.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">Serviço de conversa</p>
        <p class="diagram-card__meta">Recupera ou cria a conversa, registra mensagens e prepara executor de tools.</p>
      </div>
      <div class="diagram-flow__arrow">→</div>
      <div class="diagram-flow__step">
        <p class="diagram-card__title">Claude service</p>
        <p class="diagram-card__meta">Aciona o loop de geração e envia eventos incrementais ao cliente.</p>
      </div>
    </div>
  </div>
</div>

## REST como contrato e não como implementação do agente

É útil perceber que a API não substitui o query loop; ela o embala. Rotas como as de conversa fazem validação, autenticação, recuperação de estado e serialização, mas o comportamento agêntico continua sendo responsabilidade de serviços mais próximos do núcleo. Essa separação é saudável porque mantém HTTP como contrato de acesso, não como lugar onde a lógica do agente é reimplementada.

Além disso, `conversations.ts` mostra uma boa prática: validação explícita com Zod antes de qualquer trabalho relevante. Em sistemas agênticos, aceitar payload frouxo demais na borda é pedir para transformar erro de produto em erro de runtime.

## Backwards compatibility e legados úteis

O endpoint `/api/chat` em `src/server/api/index.ts` existe para manter compatibilidade com um formato anterior do front-end. Ele cria uma conversa efêmera, reinterpreta o histórico recebido e encaminha tudo para o mesmo serviço de streaming. Isso é um bom exemplo de como absorver legado sem contaminar demais a camada central. O sistema não obriga a UI antiga a conhecer imediatamente todo o modelo novo de conversas persistidas.

Ao mesmo tempo, isso revela um custo. Toda compatibilidade mantida na borda precisa ser administrada, testada e observada. Em arquiteturas grandes, legados pequenos podem parecer baratos, mas se acumulam rápido.

## Quando SSE basta e quando não basta

Para streaming de mensagens, SSE é um ótimo encaixe. Mas o repositório também deixa claro que ele não resolve tudo. Quando o produto precisa de uma sessão terminal remota, com input bidirecional e reconexão, entra WebSocket no PTY server. Essa divisão é pedagogicamente importante: usar um único transporte para todos os casos quase sempre leva a abstrações ruins.

O backend escolhe o protocolo de acordo com o tipo de interação, não por moda. Isso é sinal de maturidade arquitetural.
