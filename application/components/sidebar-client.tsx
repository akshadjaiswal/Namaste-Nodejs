'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import type { Season } from '@/types/chapter'

interface SidebarClientProps {
  seasons: Season[]
}

export function SidebarClient({ seasons }: SidebarClientProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSeasons, setExpandedSeasons] = useState<number[]>([1, 2, 3])

  function toggleSeason(num: number) {
    setExpandedSeasons((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    )
  }

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Logo / Title */}
      <div className="p-6 border-b border-foreground">
        <Link
          href="/"
          className="block"
          onClick={() => setIsOpen(false)}
        >
          <h2 className="font-heading text-xl font-black tracking-tight leading-tight">
            NAMASTE
            <br />
            NODE.JS
          </h2>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {seasons.map((season) => (
          <div key={season.number} className="mb-2">
            {/* Season header */}
            <button
              onClick={() => toggleSeason(season.number)}
              className="w-full flex items-center justify-between px-6 py-3 text-left font-mono text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-100"
            >
              <span>Season {String(season.number).padStart(2, '0')}</span>
              {expandedSeasons.includes(season.number) ? (
                <ChevronDown size={14} strokeWidth={1.5} />
              ) : (
                <ChevronRight size={14} strokeWidth={1.5} />
              )}
            </button>

            {/* Chapter links */}
            {expandedSeasons.includes(season.number) && (
              <ul>
                {season.chapters.map((ch) => {
                  const href = `/chapters/${ch.slug}`
                  const isActive = pathname === href

                  return (
                    <li key={ch.slug}>
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block px-6 py-2 text-sm font-body border-l-2 transition-colors duration-100 ${
                          isActive
                            ? 'bg-foreground text-background border-accent'
                            : 'border-transparent hover:bg-foreground hover:text-background hover:border-accent'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {isActive ? (
                            <span className="text-background">{ch.number}</span>
                          ) : (
                            ch.number
                          )}
                        </span>
                        <span className="block leading-snug">{ch.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-background border border-foreground hover:bg-foreground hover:text-background transition-colors duration-100"
        aria-label="Open navigation"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72 shrink-0 border-r border-foreground bg-background sticky top-0 h-screen overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setIsOpen(false)}
          />
          {/* Panel */}
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-foreground overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-foreground hover:text-background transition-colors duration-100"
              aria-label="Close navigation"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
