# MCP Cliente e Servidor

O suporte a MCP é um dos pontos em que o produto mais claramente se comporta como plataforma. `src/services/mcp/client.ts` mostra um cliente bastante completo, capaz de usar transportes por stdio, SSE, HTTP streamable e WebSocket, lidar com autenticação, cachear conexões, expor tools MCP ao runtime e até persistir resultados binários grandes quando necessário. Isso está muito além de uma integração casual.

O detalhe mais importante é que o sistema atua nos dois lados do protocolo. Ele consome tools e resources externos, mas também pode ser iniciado como servidor MCP via entrypoints específicos e pelo diretório `mcp-server/`. Esse duplo papel altera a arquitetura do produto: ele deixa de ser apenas um cliente de capacidades e vira peça de um ecossistema de agentes.

## Cliente MCP como tradutor para o runtime

O cliente não injeta capacidades externas de forma bruta. Ele normaliza nomes, controla timeout, trata sessões expiradas, integra fluxos de auth e transforma o que vem do MCP em artefatos que o restante do runtime consegue entender. Essa adaptação é essencial porque o modelo e o query loop não deveriam precisar conhecer as idiossincrasias de cada transporte ou servidor.

Em outras palavras, `client.ts` funciona como camada anticorrupção. Essa é uma decisão arquitetural muito boa, porque protege o núcleo contra a variabilidade de um ecossistema externo em crescimento.

<div class="diagram">
  <div class="diagram__header">Como o MCP entra na plataforma</div>
  <div class="diagram__body">
    <div class="diagram-grid">
      <div class="diagram-card">
        <p class="diagram-card__title">Cliente MCP</p>
        <p class="diagram-card__meta">Conecta em servidores externos, descobre tools/resources e transforma tudo em capacidades do runtime.</p>
      </div>
      <div class="diagram-card">
        <p class="diagram-card__title">Tools de integração</p>
        <p class="diagram-card__meta">`MCPTool`, `ListMcpResourcesTool`, `ReadMcpResourceTool` e `ToolSearchTool` tornam o protocolo operável pelo agente.</p>
      </div>
      <div class="diagram-card">
        <p class="diagram-card__title">Servidor MCP</p>
        <p class="diagram-card__meta">Permite que outras ferramentas tratem este produto como provedor de capacidades, não só consumidor.</p>
      </div>
    </div>
  </div>
</div>

## Impacto arquitetural do papel de servidor

Quando o produto se expõe como servidor MCP, ele assume a responsabilidade de estabilizar parte de sua semântica para terceiros. Isso muda a relação entre implementação interna e contrato externo. Recursos, tools e descrições que antes eram detalhes locais passam a ter potencial de dependentes fora do processo.

Essa transição costuma ser crítica em plataformas: quanto mais útil a integração, mais ela empurra o produto em direção a APIs implícitas. O repositório mostra esse movimento com clareza.

## Lições

MCP é valioso não só por adicionar tools externas, mas por forçar a arquitetura a pensar em contratos. Um sistema agêntico que conversa apenas consigo mesmo pode tolerar mais informalidade. Um sistema que participa de um protocolo de ecossistema precisa explicitar melhor suas fronteiras.
