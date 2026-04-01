# Guia da Seção: Operação

Esta seção trata o sistema como artefato implantável e observável. Até aqui, a documentação mostrou o produto por dentro; agora o foco é entender como ele é construído, empacotado, configurado e acompanhado em ambientes reais. Em produtos agênticos, essa camada operacional é especialmente relevante porque custo, latência, permissões e capacidade de sessão impactam diretamente a experiência do usuário.

O repositório traz sinais claros de preocupação operacional: scripts de build com Bun, Dockerfile multi-stage, chart Helm completo, configuração para Vercel, dashboards Grafana e módulos de health, metrics e logging. Isso mostra que o produto foi pensado para mais de um cenário de entrega.

## Arquivos e artefatos centrais

| Artefato | Papel |
|---|---|
| `package.json` e `scripts/` | Build do CLI e do web, typecheck, lint, empacotamento |
| `Dockerfile` | Container multi-stage para distribuição do CLI |
| `helm/claude-code/` | Deploy em Kubernetes com Deployment, HPA, ingress, PDB, PVC e secrets |
| `vercel.json` | Entrega da aplicação web em Next.js |
| `src/server/observability/` | Health checks, métricas, custo, logger e Sentry |
| `grafana/` | Dashboards para visão operacional do sistema |
