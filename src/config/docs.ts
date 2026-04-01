export interface DocConfig {
  slug: string
  label: string
}

export interface SectionConfig {
  slug: string
  label: string
  icon: string
  docs: DocConfig[]
}

export const sections: SectionConfig[] = [
  {
    slug: 'indice',
    label: 'Índice',
    icon: '📑',
    docs: [
      { slug: 'indice-geral', label: 'Índice Geral' },
      { slug: 'mapa-documental', label: 'Mapa Documental' },
    ],
  },
  {
    slug: 'visao-geral',
    label: 'Visão Geral',
    icon: '🔭',
    docs: [
      { slug: 'visao-geral-da-ferramenta', label: 'Visão Geral da Ferramenta' },
      { slug: 'matriz-de-funcionalidades', label: 'Matriz de Funcionalidades' },
    ],
  },
  {
    slug: 'cli-e-experiencia',
    label: 'CLI e Experiência',
    icon: '💻',
    docs: [
      { slug: 'guia-da-secao', label: 'Guia da Seção' },
      { slug: 'cli-tui-e-fluxo-interativo', label: 'CLI, TUI e Fluxo Interativo' },
      { slug: 'comandos-e-modos-operacionais', label: 'Comandos e Modos Operacionais' },
      { slug: 'ferramentas-do-agente-e-governanca', label: 'Ferramentas do Agente e Governança' },
    ],
  },
  {
    slug: 'web-e-api',
    label: 'Web e API',
    icon: '🌐',
    docs: [
      { slug: 'guia-da-secao', label: 'Guia da Seção' },
      { slug: 'web-app-e-experiencia-browser', label: 'Web App e Experiência Browser' },
      { slug: 'api-rest-sse-e-streaming', label: 'API REST, SSE e Streaming' },
      { slug: 'compartilhamento-exportacao-e-busca', label: 'Compartilhamento, Exportação e Busca' },
    ],
  },
  {
    slug: 'extensibilidade',
    label: 'Extensibilidade',
    icon: '🧩',
    docs: [
      { slug: 'guia-da-secao', label: 'Guia da Seção' },
      { slug: 'bridge-remoto-e-integracoes', label: 'Bridge, Remoto e Integrações' },
      { slug: 'mcp-cliente-e-servidor', label: 'MCP Cliente e Servidor' },
      { slug: 'plugins-skills-e-carga-dinamica', label: 'Plugins, Skills e Carga Dinâmica' },
    ],
  },
  {
    slug: 'agentes-e-contexto',
    label: 'Agentes e Contexto',
    icon: '🤖',
    docs: [
      { slug: 'guia-da-secao', label: 'Guia da Seção' },
      { slug: 'configuracao-permissoes-e-politicas', label: 'Configuração, Permissões e Políticas' },
      { slug: 'memoria-contexto-sessoes-e-compactacao', label: 'Memória, Contexto e Sessões' },
      { slug: 'tarefas-subagentes-e-coordenacao', label: 'Tarefas, Subagentes e Coordenação' },
    ],
  },
  {
    slug: 'backend-e-dados',
    label: 'Backend e Dados',
    icon: '🗄️',
    docs: [
      { slug: 'guia-da-secao', label: 'Guia da Seção' },
      { slug: 'backend-servicos-e-rotas', label: 'Backend, Serviços e Rotas' },
      { slug: 'persistencia-modelagem-e-banco', label: 'Persistência, Modelagem e Banco' },
      { slug: 'seguranca-autenticacao-e-rate-limit', label: 'Segurança, Autenticação e Rate Limit' },
    ],
  },
  {
    slug: 'operacao',
    label: 'Operação',
    icon: '⚙️',
    docs: [
      { slug: 'guia-da-secao', label: 'Guia da Seção' },
      { slug: 'setup-build-e-execucao-local', label: 'Setup, Build e Execução Local' },
      { slug: 'deploy-docker-helm-e-ambientes', label: 'Deploy, Docker, Helm e Ambientes' },
      { slug: 'observabilidade-metricas-e-custos', label: 'Observabilidade, Métricas e Custos' },
    ],
  },
  {
    slug: 'avaliacao',
    label: 'Avaliação',
    icon: '📊',
    docs: [
      { slug: 'guia-da-secao', label: 'Guia da Seção' },
      { slug: 'avaliacao-tecnica-achados', label: 'Avaliação Técnica e Achados' },
      { slug: 'riscos-lacunas-e-dividas-tecnicas', label: 'Riscos, Lacunas e Dívidas Técnicas' },
    ],
  },
  {
    slug: 'referencias',
    label: 'Referências',
    icon: '📚',
    docs: [
      { slug: 'glossario', label: 'Glossário' },
      { slug: 'mapa-de-fontes-e-rastreabilidade', label: 'Mapa de Fontes e Rastreabilidade' },
    ],
  },
]

export function flatDocs(): { sectionSlug: string; sectionLabel: string; docSlug: string; docLabel: string }[] {
  return sections.flatMap((s) =>
    s.docs.map((d) => ({
      sectionSlug: s.slug,
      sectionLabel: s.label,
      docSlug: d.slug,
      docLabel: d.label,
    }))
  )
}
