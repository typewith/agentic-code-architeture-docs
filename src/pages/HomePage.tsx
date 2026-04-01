import { Link } from 'react-router-dom'
import { sections } from '@/config/docs'

export default function HomePage() {
  return (
    <div className="px-6 lg:px-12 py-12 max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Agentic Code Architecture Docs
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Base de estudo sobre a arquitetura de um sistema agêntico de código no estilo Claude Code.
          Navegue pelos guias de seção abaixo ou use a busca (
          <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded">Ctrl K</kbd>
          ) para ir direto ao subsistema que você quer entender.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.slug}
            to={`/${s.slug}/${s.docs[0].slug}`}
            className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all bg-white dark:bg-gray-900"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{s.icon}</span>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {s.label}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {s.docs.length} {s.docs.length === 1 ? 'documento' : 'documentos'}
            </p>
            <ul className="mt-2 space-y-1">
              {s.docs.map((d) => (
                <li key={d.slug} className="text-sm text-gray-600 dark:text-gray-400">
                  • {d.label}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  )
}
