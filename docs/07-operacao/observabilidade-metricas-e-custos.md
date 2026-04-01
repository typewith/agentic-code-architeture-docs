# Observabilidade, Métricas e Custos

Produtos agênticos têm uma propriedade operacional que os diferencia de aplicações tradicionais: custo e latência variam com o comportamento do modelo e com a quantidade de tools acionadas. Por isso, observabilidade aqui não serve apenas para detectar erro; ela também serve para entender o perfil do agente em produção.

O repositório mostra essa preocupação em mais de um ponto. `src/server/observability/metrics.ts` registra métricas HTTP, sessões ativas, streams em voo, tokens usados, execuções de tool, duração de streaming, heap, lag de event loop e consultas de banco. Em paralelo, há módulos de `health`, `logger`, `sentry` e `cost-tracker`, além de dashboards prontos em `grafana/dashboards/`.

## Métrica como modelo do sistema

Uma métrica bem escolhida é uma hipótese sobre o que importa. Aqui, o produto mede requests, tamanho de payload, streaming, tokens, tool executions e sessões. Isso revela o que o time considera estrutural: não basta saber se o servidor responde; é preciso saber se o agente está caro, lento, preso em streams ou degradado por pressão de sessões.

<div class="diagram">
  <div class="diagram__header">Observabilidade em camadas</div>
  <div class="diagram__body">
    <div class="diagram-grid">
      <div class="diagram-card">
        <p class="diagram-card__title">Saúde</p>
        <p class="diagram-card__meta">Liveness, readiness e startup indicam se o serviço pode receber tráfego e se dependências críticas estão acessíveis.</p>
      </div>
      <div class="diagram-card">
        <p class="diagram-card__title">Métricas</p>
        <p class="diagram-card__meta">Prometheus coleta HTTP, sessões, streaming, uso de tokens, ferramentas e recursos do processo.</p>
      </div>
      <div class="diagram-card">
        <p class="diagram-card__title">Custos e erros</p>
        <p class="diagram-card__meta">Cost tracker, logger e Sentry ajudam a correlacionar falha técnica com impacto operacional e financeiro.</p>
      </div>
    </div>
  </div>
</div>

## Dashboards como produto interno

Os dashboards em `grafana/dashboards/overview.json`, `conversations.json`, `costs.json` e `infrastructure.json` indicam que a observabilidade foi pensada também para consumo humano recorrente. Isso é importante porque métrica sem painel tende a virar ruído ou dado não utilizado. Quando dashboards existem desde cedo, a arquitetura começa a produzir sinais mais estáveis de saúde do sistema.

## O que aprender

Em agentes de código, medir custo, duração de stream e tool execution não é luxo. É o que permite distinguir uma melhoria real de uma aparente. O repositório mostra uma abordagem correta ao tratar observabilidade como parte do produto e não apenas como pós-processo de operação.
