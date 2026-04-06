'use client'
import { useEffect } from 'react'
import { useBookmark } from '@/hooks/use-bookmark'

interface ChapterShortcutsProps {
  slug: string
}

export function ChapterShortcuts({ slug }: ChapterShortcutsProps) {
  const { toggle } = useBookmark(slug)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === 'b' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        toggle()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle])

  return null
}
