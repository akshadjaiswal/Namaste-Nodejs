'use client'
import Link from 'next/link'
import { ArrowRight, Bookmark } from 'lucide-react'
import { useContinueReading } from '@/hooks/use-bookmark'

interface ContinueReadingProps {
  chapters: Array<{ slug: string; title: string; number: string }>
}

export function ContinueReading({ chapters }: ContinueReadingProps) {
  const { lastVisited, bookmark } = useContinueReading()

  const targetSlug = bookmark ?? lastVisited
  if (!targetSlug) return null

  const chapter = chapters.find((c) => c.slug === targetSlug)
  if (!chapter) return null

  return (
    <div className="px-6 py-3 border-b border-foreground dark:border-[#2A2A2A]">
      <Link
        href={`/chapters/${chapter.slug}`}
        className="flex items-center justify-between gap-2 group"
      >
        <div className="min-w-0">
          <span className="flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase text-muted-foreground dark:text-[#A3A3A3] mb-0.5">
            {bookmark ? <Bookmark size={8} fill="currentColor" /> : null}
            {bookmark ? 'Bookmarked' : 'Continue Reading'}
          </span>
          <span className="block font-body text-xs leading-snug truncate group-hover:underline">
            {chapter.number} — {chapter.title}
          </span>
        </div>
        <ArrowRight size={12} strokeWidth={1.5} className="shrink-0 text-muted-foreground dark:text-[#A3A3A3]" />
      </Link>
    </div>
  )
}
