'use client'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center justify-center px-3 py-1.5 border border-foreground dark:border-[#FAFAFA] hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] transition-colors duration-100"
    >
      {resolvedTheme === 'dark'
        ? <Sun size={13} strokeWidth={1.5} />
        : <Moon size={13} strokeWidth={1.5} />
      }
    </button>
  )
}
