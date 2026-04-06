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
          ? 'bg-foreground dark:bg-[#FAFAFA] text-background dark:text-[#0A0A0A] border-foreground dark:border-[#FAFAFA]'
          : 'border-foreground dark:border-[#FAFAFA] hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A]'
      }`}
    >
      <Bookmark size={12} strokeWidth={bookmarked ? 2.5 : 1.5} fill={bookmarked ? 'currentColor' : 'none'} />
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  )
}
