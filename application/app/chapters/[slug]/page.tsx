import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllChapters, getChapterBySlug } from '@/lib/chapters'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { TableOfContents } from '@/components/table-of-contents'
import { ChapterNav } from '@/components/chapter-nav'
import { ReadingProgress } from '@/components/reading-progress'
import { BookmarkButton } from '@/components/bookmark-button'
import { CompleteButton } from '@/components/complete-button'
import { PrintButton } from '@/components/print-button'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ChapterShortcuts } from '@/components/chapter-shortcuts'

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
  if (!chapter) return { title: 'Chapter Not Found' }
  return {
    title: chapter.title,
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

  if (!chapter) {
    notFound()
  }

  const allChapters = getAllChapters()
  const currentIndex = allChapters.findIndex((c) => c.slug === chapter.slug)
  const prev = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const next =
    currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null
  const allSlugsInSeason = allChapters
    .filter((c) => c.season === chapter.season)
    .map((c) => c.slug)

  return (
    <>
      <ReadingProgress />
      <ScrollToTop />
      <ChapterShortcuts slug={chapter.slug} />
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <header className="mb-12">
        <div className="flex flex-col gap-0.5 mb-3">
          <span className="font-mono text-xs tracking-widest uppercase text-accent">
            {chapter.seasonLabel} · Chapter {chapter.number}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground dark:text-[#A3A3A3]">
            {chapter.readTime} min read
          </span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
          {chapter.title}
        </h1>
        <div className="h-2 bg-foreground dark:bg-[#FAFAFA] mt-8" />
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <BookmarkButton slug={chapter.slug} />
          <CompleteButton slug={chapter.slug} seasonLabel={chapter.seasonLabel} allSlugsInSeason={allSlugsInSeason} />
          <PrintButton />
        </div>
      </header>

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

      <div className="h-1 bg-foreground dark:bg-[#FAFAFA] mt-16 mb-8" />
      <ChapterNav prev={prev} next={next} />
    </div>
    </>
  )
}
