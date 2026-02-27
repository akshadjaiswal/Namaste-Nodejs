import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ChapterMeta } from '@/types/chapter'

interface ChapterNavProps {
  prev: ChapterMeta | null
  next: ChapterMeta | null
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      {prev ? (
        <Link
          href={`/chapters/${prev.slug}`}
          className="flex items-center gap-3 border border-foreground p-4 hover:bg-foreground hover:text-background transition-colors duration-100 flex-1"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="shrink-0" />
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              Previous
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
          className="flex items-center gap-3 border border-foreground p-4 hover:bg-foreground hover:text-background transition-colors duration-100 flex-1 justify-end text-right"
        >
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              Next
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
