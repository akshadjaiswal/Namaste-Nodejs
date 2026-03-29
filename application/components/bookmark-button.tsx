'use client'
import { Bookmark } from 'lucide-react'
import { useBookmark, useLastVisited } from '@/hooks/use-bookmark'

interface BookmarkButtonProps {
  slug: string
}

export function BookmarkButton({ slug }: BookmarkButtonProps) {
  useLastVisited(slug)
  const { bookmarked, toggle } = useBookmark(slug)

  return (
    <button
      onClick={toggle}
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this chapter'}
      title={bookmarked ? 'Remove bookmark' : 'Bookmark this chapter'}
      className={`flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase border px-3 py-1.5 transition-colors duration-100 ${
        bookmarked
          ? 'bg-foreground text-background border-foreground'
          : 'border-foreground hover:bg-foreground hover:text-background'
      }`}
    >
      <Bookmark size={12} strokeWidth={bookmarked ? 2.5 : 1.5} fill={bookmarked ? 'currentColor' : 'none'} />
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  )
}
