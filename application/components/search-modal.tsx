'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

interface SearchEntry {
  slug: string
  title: string
  number: string
  seasonLabel: string
}

interface SearchModalProps {
  onClose: () => void
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [fuse, setFuse] = useState<Fuse<SearchEntry> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/search-index.json')
      .then((r) => r.json())
      .then((data: SearchEntry[]) => {
        setFuse(
          new Fuse(data, {
            keys: ['title', 'number', 'seasonLabel'],
            threshold: 0.35,
            includeScore: true,
          })
        )
        setResults(data.slice(0, 8))
      })
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!fuse) return
    if (!query.trim()) {
      fetch('/search-index.json')
        .then((r) => r.json())
        .then((data: SearchEntry[]) => setResults(data.slice(0, 8)))
      return
    }
    const hits = fuse.search(query).map((r) => r.item)
    setResults(hits.slice(0, 8))
    setActiveIndex(0)
  }, [query, fuse])

  const navigate = useCallback(
    (slug: string) => {
      router.push(`/chapters/${slug}`)
      onClose()
    },
    [router, onClose]
  )

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      navigate(results[activeIndex].slug)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40" />

      <div
        className="relative w-full max-w-xl border-2 border-foreground bg-background"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input */}
        <div className="flex items-center border-b border-border-light">
          <span className="pl-4 font-mono text-xs text-muted-foreground select-none">/</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters..."
            className="w-full px-3 py-3 font-mono text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="px-4 py-3 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul>
            {results.map((item, i) => (
              <li key={item.slug}>
                <button
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-75 ${
                    i === activeIndex
                      ? 'bg-foreground text-background'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => navigate(item.slug)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <span className="font-mono text-xs tracking-widest uppercase text-current opacity-60 w-20 shrink-0">
                    {item.number}
                  </span>
                  <span className="flex-1 font-body text-sm truncate">{item.title}</span>
                  <span className="font-mono text-[10px] tracking-widest text-current opacity-50 ml-3 shrink-0">
                    {item.seasonLabel}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <p className="px-4 py-6 font-mono text-xs text-muted-foreground text-center">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  )
}
