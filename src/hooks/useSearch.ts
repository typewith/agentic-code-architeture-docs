import { useMemo, useState, useCallback } from 'react'
import Fuse from 'fuse.js'
import { docs, type DocEntry } from '@/lib/docs-loader'

export interface SearchResult {
  item: DocEntry
  score: number
}

export function useSearch() {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'content', weight: 1 },
        ],
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    []
  )

  const results: SearchResult[] = useMemo(() => {
    if (query.length < 2) return []
    return fuse
      .search(query, { limit: 10 })
      .map((r) => ({ item: r.item, score: r.score ?? 1 }))
  }, [fuse, query])

  const reset = useCallback(() => setQuery(''), [])

  return { query, setQuery, results, reset }
}
