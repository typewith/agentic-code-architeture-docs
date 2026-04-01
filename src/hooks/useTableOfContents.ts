import { useMemo } from 'react'

export interface TocItem {
  id: string
  text: string
  level: number
}

export function useTableOfContents(markdown: string): TocItem[] {
  return useMemo(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const items: TocItem[] = []
    let match

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')

      items.push({ id, text, level })
    }

    return items
  }, [markdown])
}
