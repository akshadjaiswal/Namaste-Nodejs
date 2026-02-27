'use client'

import { useEffect, useState } from 'react'
import type { TocHeading } from '@/types/chapter'

interface TableOfContentsProps {
  headings: TocHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.slug)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24">
      <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b border-foreground">
        On this page
      </h4>
      <ul className="space-y-0.5">
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
              className={`block text-sm py-1 px-2 font-body transition-colors duration-100 ${
                activeId === h.slug
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:bg-foreground hover:text-background'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
