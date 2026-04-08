import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ChapterMeta } from '@/types/chapter'

interface ChapterNavProps {
  prev: ChapterMeta | null
  next: ChapterMeta | null
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
      {prev ? (
        <Link
          href={`/chapters/${prev.slug}`}
          className="flex items-center gap-3 border border-foreground dark:border-[#FAFAFA] p-4 hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] transition-colors duration-100 flex-1"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="shrink-0" />
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              Previous{prev.readTime ? ` · ${prev.readTime} min` : ''}
            </span>
            <p className="font-heading text-sm font-semibold leading-snug">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/chapters/${next.slug}`}
          className="flex items-center gap-3 border border-foreground dark:border-[#FAFAFA] p-4 bg-foreground dark:bg-[#FAFAFA] text-background dark:text-[#0A0A0A] hover:opacity-80 transition-opacity duration-100 flex-1 justify-end text-right"
        >
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              Next{next.readTime ? ` · ${next.readTime} min` : ''}
            </span>
            <p className="font-heading text-sm font-semibold leading-snug">
              {next.title}
            </p>
          </div>
          <ArrowRight size={16} strokeWidth={1.5} className="shrink-0" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
