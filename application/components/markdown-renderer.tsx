import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
  chapterSlug: string
}

export function MarkdownRenderer({ content, chapterSlug }: MarkdownRendererProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b-2 border-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl md:text-2xl font-bold mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-lg font-semibold mt-6 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="font-body text-base leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-4 space-y-1.5 font-body text-base leading-relaxed">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-4 space-y-1.5 font-body text-base leading-relaxed">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    pre: ({ children }) => (
      <pre className="mb-6 overflow-x-auto bg-[#fafafa] border border-border-light border-l-[3px] border-l-accent p-5 font-mono text-sm leading-7">
        {children}
      </pre>
    ),
    code: ({ className, children, ...props }) => {
      const isBlock = className?.startsWith('language-')
      if (isBlock) {
        return (
          <code className="font-mono text-foreground" {...props}>
            {children}
          </code>
        )
      }
      return (
        <code className="font-mono text-sm bg-[#f0f4f0] border border-border-light px-1.5 py-0.5">
          {children}
        </code>
      )
    },
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border-2 border-foreground font-body text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-foreground text-background">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="border border-foreground p-3 text-left font-heading font-bold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-foreground p-3">{children}</td>
    ),
    img: ({ src, alt }) => {
      if (!src || typeof src !== 'string') return null
      let imageSrc = src
      if (src.startsWith('./')) {
        const cleaned = decodeURIComponent(src)
          .replace('./', '')
          .replace(/^images\//, '')
        imageSrc = `/chapter-images/${chapterSlug}/${cleaned}`
      } else if (!src.startsWith('http') && !src.startsWith('/')) {
        const cleaned = decodeURIComponent(src)
          .replace(/^images\//, '')
        imageSrc = `/chapter-images/${chapterSlug}/${cleaned}`
      }
      return (
        <span className="block my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={alt || ''}
            className="max-w-full border-2 border-foreground"
          />
        </span>
      )
    },
    hr: () => <div className="h-1 bg-foreground my-8" />,
    a: ({ href, children }) => (
      <a
        href={href}
        className="underline underline-offset-4 decoration-1 hover:bg-foreground hover:text-background hover:no-underline px-0.5 transition-colors duration-100"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-foreground pl-6 my-6 font-body italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  )
}
