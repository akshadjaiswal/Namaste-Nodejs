'use client'
import { CheckSquare, Square } from 'lucide-react'
import { useCompletedChapters } from '@/hooks/use-bookmark'

interface CompleteButtonProps {
  slug: string
}

export function CompleteButton({ slug }: CompleteButtonProps) {
  const { isCompleted, toggle } = useCompletedChapters()
  const done = isCompleted(slug)

  return (
    <button
      onClick={() => toggle(slug)}
      aria-label={done ? 'Mark as incomplete' : 'Mark chapter as complete'}
      title={done ? 'Mark as incomplete' : 'Mark chapter as complete'}
      className={`flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase border px-3 py-1.5 transition-colors duration-100 ${
        done
          ? 'bg-foreground dark:bg-[#FAFAFA] text-background dark:text-[#0A0A0A] border-foreground dark:border-[#FAFAFA]'
          : 'border-foreground dark:border-[#FAFAFA] hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A]'
      }`}
    >
      {done
        ? <CheckSquare size={12} strokeWidth={2} />
        : <Square size={12} strokeWidth={1.5} />
      }
      {done ? 'Completed' : 'Mark Complete'}
    </button>
  )
}
