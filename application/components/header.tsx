import { Github, Star } from 'lucide-react'
import { SearchTrigger } from './search-trigger'
import { ThemeToggle } from './theme-toggle'
import { ShortcutsTrigger } from './shortcuts-trigger'

interface HeaderProps {
  stars?: number | null
}

export function Header({ stars }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background dark:bg-[#0A0A0A] border-b border-border-light dark:border-[#2A2A2A]">
      <div className="flex items-center justify-between pl-14 pr-6 md:px-12 py-3">

        {/* Left: attribution */}
        <p className="hidden sm:block font-mono text-[10px] tracking-widest text-muted-foreground dark:text-[#A3A3A3]">
          Based on Namaste Node.js by Akshay Saini.{' '}
          Docs by{' '}
          <a
            href="https://github.com/akshadjaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="author-link"
          >
            Akshad Jaiswal
          </a>
          .
        </p>

        {/* Right: Search + Theme + JS CTA + GitHub */}
        <div className="flex items-center gap-3 ml-auto">

          {/* Search */}
          <SearchTrigger />

          {/* Keyboard shortcuts */}
          <ShortcutsTrigger />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* JavaScript CTA */}
          <a
            href="https://namaste-javascript.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wide border border-foreground dark:border-[#FAFAFA] hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] transition-colors duration-100"
          >
            <span className="hidden sm:inline">Learn </span>JavaScript →
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/akshadjaiswal/Namaste-Nodejs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wide border border-foreground dark:border-[#FAFAFA] hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] transition-colors duration-100"
            aria-label="View on GitHub"
          >
            <Github size={14} strokeWidth={1.5} />
            <span>GitHub</span>
            {stars != null && (
              <>
                <span className="hidden sm:block w-px h-3 bg-current opacity-30" />
                <Star size={12} strokeWidth={1.5} className="hidden sm:block" />
                <span className="hidden sm:block">{stars.toLocaleString()}</span>
              </>
            )}
          </a>
        </div>

      </div>

      {/* Mobile attribution row */}
      <div className="sm:hidden pl-14 pr-4 pb-2 border-t border-border-light dark:border-[#2A2A2A]">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground dark:text-[#A3A3A3]">
          Based on Namaste Node.js by Akshay Saini.{' '}
          Docs by{' '}
          <a
            href="https://github.com/akshadjaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="author-link"
          >
            Akshad Jaiswal
          </a>
          .
        </p>
      </div>
    </header>
  )
}
