'use client'
import { Link2 } from 'lucide-react'
import { useState } from 'react'

export function HeadingAnchor({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
    window.history.pushState(null, '', `#${id}`)
  }

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      aria-label="Copy link to section"
      title={copied ? 'Link copied!' : 'Copy link to section'}
      className="inline-flex items-center ml-2 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity duration-100 text-muted-foreground dark:text-[#A3A3A3]"
    >
      <Link2 size={14} strokeWidth={1.5} />
    </a>
  )
}
