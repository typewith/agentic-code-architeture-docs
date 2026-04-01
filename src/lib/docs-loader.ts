// 00-indice
import indiceGeral from '../../docs/00-indice/indice-geral.md?raw'
import mapaDocumental from '../../docs/00-indice/mapa-documental.md?raw'

// 01-visao-geral
import visaoGeral from '../../docs/01-visao-geral/visao-geral-da-ferramenta.md?raw'
import matrizFuncionalidades from '../../docs/01-visao-geral/matriz-de-funcionalidades.md?raw'

// 02-cli-e-experiencia
import guiaCli from '../../docs/02-cli-e-experiencia/00-guia-da-secao.md?raw'
import cliTui from '../../docs/02-cli-e-experiencia/cli-tui-e-fluxo-interativo.md?raw'
import comandosModos from '../../docs/02-cli-e-experiencia/comandos-e-modos-operacionais.md?raw'
import ferramentasGovernanca from '../../docs/02-cli-e-experiencia/ferramentas-do-agente-e-governanca.md?raw'

// 03-web-e-api
import guiaWebApi from '../../docs/03-web-e-api/00-guia-da-secao.md?raw'
import webApp from '../../docs/03-web-e-api/web-app-e-experiencia-browser.md?raw'
import apiRestSse from '../../docs/03-web-e-api/api-rest-sse-e-streaming.md?raw'
import compartilhamento from '../../docs/03-web-e-api/compartilhamento-exportacao-e-busca.md?raw'

// 04-extensibilidade
import guiaExtensibilidade from '../../docs/04-extensibilidade/00-guia-da-secao.md?raw'
import bridgeRemoto from '../../docs/04-extensibilidade/bridge-remoto-e-integracoes.md?raw'
import mcpCliente from '../../docs/04-extensibilidade/mcp-cliente-e-servidor.md?raw'
import pluginsSkills from '../../docs/04-extensibilidade/plugins-skills-e-carga-dinamica.md?raw'

// 05-agentes-e-contexto
import guiaAgentes from '../../docs/05-agentes-e-contexto/00-guia-da-secao.md?raw'
import configPermissoes from '../../docs/05-agentes-e-contexto/configuracao-permissoes-e-politicas.md?raw'
import memoriaContexto from '../../docs/05-agentes-e-contexto/memoria-contexto-sessoes-e-compactacao.md?raw'
import tarefasSubagentes from '../../docs/05-agentes-e-contexto/tarefas-subagentes-e-coordenacao.md?raw'

// 06-backend-e-dados
import guiaBackend from '../../docs/06-backend-e-dados/00-guia-da-secao.md?raw'
import backendServicos from '../../docs/06-backend-e-dados/backend-servicos-e-rotas.md?raw'
import persistencia from '../../docs/06-backend-e-dados/persistencia-modelagem-e-banco.md?raw'
import seguranca from '../../docs/06-backend-e-dados/seguranca-autenticacao-e-rate-limit.md?raw'

// 07-operacao
import guiaOperacao from '../../docs/07-operacao/00-guia-da-secao.md?raw'
import setupBuild from '../../docs/07-operacao/setup-build-e-execucao-local.md?raw'
import deployDocker from '../../docs/07-operacao/deploy-docker-helm-e-ambientes.md?raw'
import observabilidade from '../../docs/07-operacao/observabilidade-metricas-e-custos.md?raw'

// 08-avaliacao
import guiaAvaliacao from '../../docs/08-avaliacao/00-guia-da-secao.md?raw'
import avaliacaoTecnica from '../../docs/08-avaliacao/avaliacao-tecnica-achados.md?raw'
import riscosLacunas from '../../docs/08-avaliacao/riscos-lacunas-e-dividas-tecnicas.md?raw'

// 09-referencias
import glossario from '../../docs/09-referencias/glossario.md?raw'
import mapaFontes from '../../docs/09-referencias/mapa-de-fontes-e-rastreabilidade.md?raw'

export interface DocEntry {
  slug: string
  sectionSlug: string
  title: string
  content: string
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Sem título'
}

function createEntry(sectionSlug: string, docSlug: string, content: string): DocEntry {
  return {
    slug: `${sectionSlug}/${docSlug}`,
    sectionSlug,
    title: extractTitle(content),
    content,
  }
}

export const docs: DocEntry[] = [
  // 00 - Índice
  createEntry('indice', 'indice-geral', indiceGeral),
  createEntry('indice', 'mapa-documental', mapaDocumental),

  // 01 - Visão Geral
  createEntry('visao-geral', 'visao-geral-da-ferramenta', visaoGeral),
  createEntry('visao-geral', 'matriz-de-funcionalidades', matrizFuncionalidades),

  // 02 - CLI e Experiência
  createEntry('cli-e-experiencia', 'guia-da-secao', guiaCli),
  createEntry('cli-e-experiencia', 'cli-tui-e-fluxo-interativo', cliTui),
  createEntry('cli-e-experiencia', 'comandos-e-modos-operacionais', comandosModos),
  createEntry('cli-e-experiencia', 'ferramentas-do-agente-e-governanca', ferramentasGovernanca),

  // 03 - Web e API
  createEntry('web-e-api', 'guia-da-secao', guiaWebApi),
  createEntry('web-e-api', 'web-app-e-experiencia-browser', webApp),
  createEntry('web-e-api', 'api-rest-sse-e-streaming', apiRestSse),
  createEntry('web-e-api', 'compartilhamento-exportacao-e-busca', compartilhamento),

  // 04 - Extensibilidade
  createEntry('extensibilidade', 'guia-da-secao', guiaExtensibilidade),
  createEntry('extensibilidade', 'bridge-remoto-e-integracoes', bridgeRemoto),
  createEntry('extensibilidade', 'mcp-cliente-e-servidor', mcpCliente),
  createEntry('extensibilidade', 'plugins-skills-e-carga-dinamica', pluginsSkills),

  // 05 - Agentes e Contexto
  createEntry('agentes-e-contexto', 'guia-da-secao', guiaAgentes),
  createEntry('agentes-e-contexto', 'configuracao-permissoes-e-politicas', configPermissoes),
  createEntry('agentes-e-contexto', 'memoria-contexto-sessoes-e-compactacao', memoriaContexto),
  createEntry('agentes-e-contexto', 'tarefas-subagentes-e-coordenacao', tarefasSubagentes),

  // 06 - Backend e Dados
  createEntry('backend-e-dados', 'guia-da-secao', guiaBackend),
  createEntry('backend-e-dados', 'backend-servicos-e-rotas', backendServicos),
  createEntry('backend-e-dados', 'persistencia-modelagem-e-banco', persistencia),
  createEntry('backend-e-dados', 'seguranca-autenticacao-e-rate-limit', seguranca),

  // 07 - Operação
  createEntry('operacao', 'guia-da-secao', guiaOperacao),
  createEntry('operacao', 'setup-build-e-execucao-local', setupBuild),
  createEntry('operacao', 'deploy-docker-helm-e-ambientes', deployDocker),
  createEntry('operacao', 'observabilidade-metricas-e-custos', observabilidade),

  // 08 - Avaliação
  createEntry('avaliacao', 'guia-da-secao', guiaAvaliacao),
  createEntry('avaliacao', 'avaliacao-tecnica-achados', avaliacaoTecnica),
  createEntry('avaliacao', 'riscos-lacunas-e-dividas-tecnicas', riscosLacunas),

  // 09 - Referências
  createEntry('referencias', 'glossario', glossario),
  createEntry('referencias', 'mapa-de-fontes-e-rastreabilidade', mapaFontes),
]

export function getDoc(section: string, doc: string): DocEntry | undefined {
  return docs.find((d) => d.sectionSlug === section && d.slug === `${section}/${doc}`)
}

export function getDocsForSection(sectionSlug: string): DocEntry[] {
  return docs.filter((d) => d.sectionSlug === sectionSlug)
}
