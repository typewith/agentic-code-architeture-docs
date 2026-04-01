import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { sections } from '@/config/docs'

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { section, doc } = useParams()
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (section) initial.add(section)
    else initial.add('indice')
    return initial
  })

  const toggleSection = (slug: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  useEffect(() => {
    if (!section) return
    setOpenSections((prev) => {
      if (prev.has(section)) return prev
      const next = new Set(prev)
      next.add(section)
      return next
    })
  }, [section])

  return (
    <nav className="py-4 text-sm">
      {sections.map((s) => {
        const isOpen = openSections.has(s.slug)
        const isCurrent = s.slug === section

        return (
          <div key={s.slug} className="mb-1">
            <button
              onClick={() => toggleSection(s.slug)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-left font-semibold transition-colors rounded-lg mx-1
                ${isCurrent
                  ? 'text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              <span className="text-base">{s.icon}</span>
              <span className="flex-1">{s.label}</span>
              <ChevronIcon open={isOpen} />
            </button>

            {isOpen && (
              <ul className="mt-0.5 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                {s.docs.map((d) => {
                  const isActive = s.slug === section && d.slug === doc
                  return (
                    <li key={d.slug}>
                      <Link
                        to={`/${s.slug}/${d.slug}`}
                        onClick={onNavigate}
                        className={`block px-3 py-1.5 rounded-md transition-colors my-0.5
                          ${isActive
                            ? 'sidebar-link-active font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }`}
                      >
                        {d.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
