import type { Metadata } from 'next'
import { getAllChapters, getChapterBySlug } from '@/lib/chapters'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { TableOfContents } from '@/components/table-of-contents'
import { ChapterNav } from '@/components/chapter-nav'

export function generateStaticParams() {
  const chapters = getAllChapters()
  return chapters.map((ch) => ({ slug: ch.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const chapter = getChapterBySlug(slug)
  return {
    title: `${chapter.title} — Namaste Node.js`,
    description: `Chapter ${chapter.number}: ${chapter.title}`,
  }
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const chapter = getChapterBySlug(slug)
  const allChapters = getAllChapters()

  const currentIndex = allChapters.findIndex((c) => c.slug === chapter.slug)
  const prev = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const next =
    currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Chapter header */}
      <header className="mb-12">
        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          {chapter.seasonLabel} &mdash; Chapter {chapter.number}
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mt-3 leading-tight">
          {chapter.title}
        </h1>
        <div className="h-2 bg-foreground mt-8" />
      </header>

      {/* Content area with TOC sidebar on desktop */}
      <div className="flex gap-12">
        <article className="flex-1 min-w-0">
          <MarkdownRenderer content={chapter.content} chapterSlug={chapter.slug} />
        </article>

        {chapter.headings.length > 0 && (
          <aside className="hidden xl:block w-56 shrink-0">
            <TableOfContents headings={chapter.headings} />
          </aside>
        )}
      </div>

      {/* Previous/Next navigation */}
      <div className="h-1 bg-foreground mt-16 mb-8" />
      <ChapterNav prev={prev} next={next} />
    </div>
  )
}
