import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import type { Components } from 'react-markdown'
import type { Options } from 'rehype-sanitize'

const sanitizeSchema: Options = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'article',
    'details',
    'div',
    'section',
    'span',
    'summary',
  ],
  attributes: {
    ...defaultSchema.attributes,
    article: ['className'],
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    details: ['className'],
    div: ['className'],
    p: [...(defaultSchema.attributes?.p ?? []), 'className'],
    section: ['className'],
    span: ['className'],
    summary: ['className'],
  },
}

const components: Components = {
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-4">
      <table {...props}>{children}</table>
    </div>
  ),
  h2: ({ children, ...props }) => {
    const text = getTextContent(children)
    const id = slugify(text)
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const text = getTextContent(children)
    const id = slugify(text)
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    )
  },
}

function getTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(getTextContent).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>
    return getTextContent(el.props.children)
  }
  return ''
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export default function DocRenderer({ content }: { content: string }) {
  return (
    <div className="doc-content">
      <ReactMarkdown
        className="prose prose-gray dark:prose-invert max-w-none"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema], rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
