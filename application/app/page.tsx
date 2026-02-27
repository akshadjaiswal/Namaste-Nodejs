import Link from 'next/link'
import { getSeasons } from '@/lib/chapters'

export default function Home() {
  const seasons = getSeasons()

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Hero */}
      <header className="mb-20">
        <p className="font-mono text-xs tracking-widest uppercase mb-4">
          A Complete Learning Resource
        </p>
        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
          NAMASTE
          <br />
          NODE.JS
        </h1>
        <div className="h-2 bg-foreground mt-8 mb-6" />
        <p className="font-body text-lg md:text-xl leading-relaxed max-w-2xl">
          34 chapters across 3 seasons. From the fundamentals of the V8 engine
          and event loop to building and deploying a full-stack application.
        </p>
      </header>

      {/* Seasons */}
      {seasons.map((season) => (
        <section key={season.number} className="mb-20">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-mono text-xs tracking-widest uppercase text-accent">
              Season {String(season.number).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {season.chapters.length} chapters
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {season.number === 1 && 'Foundations'}
            {season.number === 2 && 'Building DevTinder'}
            {season.number === 3 && 'Deployment'}
          </h2>
          <p className="font-body text-muted-foreground mb-6">
            {season.description}
          </p>
          <div className="h-1 bg-foreground mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2">
            {season.chapters.map((ch) => (
              <Link
                key={ch.slug}
                href={`/chapters/${ch.slug}`}
                className="group block border border-foreground p-5 -mt-px -ml-px hover:bg-foreground hover:text-background transition-colors duration-100"
              >
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground group-hover:text-background/60">
                  {ch.number}
                </span>
                <h3 className="font-heading text-base font-semibold mt-1 leading-snug">
                  {ch.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-foreground pt-8 mt-12">
        <p className="font-mono text-xs text-muted-foreground">
          Based on the Namaste Node.js series by Akshay Saini.
          <br />
          Documentation by Akshad Jaiswal.
        </p>
      </footer>
    </div>
  )
}
