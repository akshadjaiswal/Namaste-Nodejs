import { Github, Star } from 'lucide-react'

interface HeaderProps {
  stars?: number | null
}

export function Header({ stars }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border-light">
      <div className="flex items-center justify-end px-6 md:px-12 py-3">
        <a
          href="https://github.com/akshadjaiswal/Namaste-Nodejs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wide border border-foreground hover:bg-foreground hover:text-background transition-colors duration-100"
          aria-label="View on GitHub"
        >
          <Github size={14} strokeWidth={1.5} />
          <span>GitHub</span>
          {stars != null && (
            <>
              <span className="w-px h-3 bg-current opacity-30" />
              <Star size={12} strokeWidth={1.5} />
              <span>{stars.toLocaleString()}</span>
            </>
          )}
        </a>
      </div>
    </header>
  )
}
