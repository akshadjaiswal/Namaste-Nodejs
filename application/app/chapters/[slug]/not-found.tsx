import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        404
      </span>
      <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tight mt-3 leading-tight">
        Chapter Not Found
      </h1>
      <div className="h-2 bg-foreground mt-8 mb-8" />
      <p className="font-body text-lg text-muted-foreground mb-8">
        The chapter you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block border border-foreground px-6 py-3 font-mono text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors duration-100"
      >
        Back to all chapters
      </Link>
    </div>
  )
}
