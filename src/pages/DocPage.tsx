import { useParams, Link } from 'react-router-dom'
import { getDoc } from '@/lib/docs-loader'
import { sections, flatDocs } from '@/config/docs'
import DocRenderer from '@/components/DocRenderer'
import TableOfContents from '@/components/TableOfContents'
import { useTableOfContents } from '@/hooks/useTableOfContents'
import NotFound from './NotFound'

function getSectionLabel(sectionSlug: string): string {
  return sections.find((s) => s.slug === sectionSlug)?.label ?? sectionSlug
}

export default function DocPage() {
  const { section, doc: docSlug } = useParams<{ section: string; doc: string }>()
  const entry = section && docSlug ? getDoc(section, docSlug) : undefined
  const tocItems = useTableOfContents(entry?.content ?? '')

  if (!entry || !section || !docSlug) {
    return <NotFound />
  }

  // Find prev/next
  const flat = flatDocs()
  const currentIndex = flat.findIndex(
    (f) => f.sectionSlug === section && f.docSlug === docSlug
  )
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null

  return (
    <div className="flex">
      {/* Content */}
      <div className="flex-1 min-w-0 px-6 lg:px-12 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">
            Docs
          </Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300">{getSectionLabel(section)}</span>
        </nav>

        {/* Document content */}
        <DocRenderer content={entry.content} />

        {/* Prev/Next navigation */}
        <div className="flex items-stretch gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          {prev ? (
            <Link
              to={`/${prev.sectionSlug}/${prev.docSlug}`}
              className="flex-1 group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Anterior</div>
              <div className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                ← {prev.docLabel}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              to={`/${next.sectionSlug}/${next.docSlug}`}
              className="flex-1 group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-right"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Próximo</div>
              <div className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                {next.docLabel} →
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      {/* Table of Contents */}
      <div className="hidden xl:block w-56 shrink-0 py-8 pr-6">
        <div className="sticky top-24">
          <TableOfContents items={tocItems} />
        </div>
      </div>
    </div>
  )
}
