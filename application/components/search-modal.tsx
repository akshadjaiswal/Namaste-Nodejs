'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Fuse, { type FuseResultMatch } from 'fuse.js'

interface SearchEntry {
  slug: string
  title: string
  number: string
  seasonLabel: string
  content: string
}

interface SearchResult {
  item: SearchEntry
  snippet: string | null
}

interface SearchModalProps {
  onClose: () => void
}

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractSnippet(
  item: SearchEntry,
  matches: readonly FuseResultMatch[] | undefined,
  query: string
): string | null {
  if (!matches || !query.trim()) return null
  const contentMatch = matches.find((m) => m.key === 'content')
  if (!contentMatch || !contentMatch.indices.length) return null
  const [start, end] = contentMatch.indices[0]
  const text = item.content
  const padStart = Math.max(0, start - 60)
  const padEnd = Math.min(text.length, end + 60)
  const raw = text.slice(padStart, padEnd)
  const prefix = padStart > 0 ? '…' : ''
  const suffix = padEnd < text.length ? '…' : ''
  return prefix + raw + suffix
}

function HighlightedSnippet({ snippet, query }: { snippet: string; query: string }) {
  const parts = snippet.split(new RegExp(`(${escapeRegex(query)})`, 'gi'))
  return (
    <span className="font-mono text-[10px] leading-relaxed block mt-0.5 truncate opacity-70">
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-transparent text-accent font-semibold not-italic">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  )
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [fuse, setFuse] = useState<Fuse<SearchEntry> | null>(null)
  const [allEntries, setAllEntries] = useState<SearchEntry[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/search-index.json')
      .then((r) => r.json())
      .then((data: SearchEntry[]) => {
        setAllEntries(data)
        setFuse(
          new Fuse(data, {
            keys: [
              { name: 'title', weight: 0.6 },
              { name: 'content', weight: 0.3 },
              { name: 'seasonLabel', weight: 0.1 },
            ],
            threshold: 0.3,
            ignoreLocation: true,
            minMatchCharLength: 2,
            includeScore: true,
            includeMatches: true,
          })
        )
        setResults(data.slice(0, 8).map((item) => ({ item, snippet: null })))
      })
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!fuse) return
    if (!query.trim()) {
      setResults(allEntries.slice(0, 8).map((item) => ({ item, snippet: null })))
      return
    }
    const hits = fuse.search(query).slice(0, 8).map((r) => ({
      item: r.item,
      snippet: extractSnippet(r.item, r.matches, query),
    }))
    setResults(hits)
    setActiveIndex(0)
  }, [query, fuse, allEntries])

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
      navigate(results[activeIndex].item.slug)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 dark:bg-[#FAFAFA]/20" />

      <div
        className="relative w-full max-w-xl border-2 border-foreground dark:border-[#FAFAFA] bg-background dark:bg-[#0A0A0A]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input */}
        <div className="flex items-center border-b border-border-light dark:border-[#2A2A2A]">
          <span className="pl-4 font-mono text-xs text-muted-foreground dark:text-[#A3A3A3] select-none">/</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters..."
            className="w-full px-3 py-3 font-mono text-sm bg-transparent outline-none placeholder:text-muted-foreground dark:placeholder:text-[#A3A3A3]"
          />
          <button
            onClick={onClose}
            className="px-4 py-3 font-mono text-xs text-muted-foreground dark:text-[#A3A3A3] hover:text-foreground dark:hover:text-[#FAFAFA]"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul>
            {results.map((result, i) => (
              <li key={result.item.slug}>
                <button
                  className={`w-full flex flex-col px-4 py-2.5 text-left transition-colors duration-75 ${
                    i === activeIndex
                      ? 'bg-foreground dark:bg-[#FAFAFA] text-background dark:text-[#0A0A0A]'
                      : 'hover:bg-muted dark:hover:bg-[#1A1A1A]'
                  }`}
                  onClick={() => navigate(result.item.slug)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs tracking-widest uppercase text-current opacity-60 w-20 shrink-0">
                      {result.item.number}
                    </span>
                    <span className="flex-1 font-body text-sm truncate">{result.item.title}</span>
                    <span className="font-mono text-[10px] tracking-widest text-current opacity-50 ml-3 shrink-0">
                      {result.item.seasonLabel}
                    </span>
                  </div>
                  {result.snippet && query && (
                    <div className="pl-20 w-full overflow-hidden">
                      <HighlightedSnippet snippet={result.snippet} query={query} />
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <p className="px-4 py-6 font-mono text-xs text-muted-foreground dark:text-[#A3A3A3] text-center">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  )
}
