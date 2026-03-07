import { Github, Star } from 'lucide-react'

interface HeaderProps {
  stars?: number | null
}

export function Header({ stars }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border-light">
      <div className="flex items-center justify-between px-6 md:px-12 py-3">

        {/* Left: attribution */}
        <p className="hidden sm:block font-mono text-[10px] tracking-widest text-muted-foreground">
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

        {/* Right: JS CTA + GitHub */}
        <div className="flex items-center gap-3 ml-auto">

          {/* JavaScript CTA */}
          <a
            href="https://namaste-javascript.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wide border border-foreground hover:bg-foreground hover:text-background transition-colors duration-100"
          >
            <span className="hidden sm:inline">Learn </span>JavaScript →
          </a>

          {/* GitHub */}
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

      </div>
    </header>
  )
}
