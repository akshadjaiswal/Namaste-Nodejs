'use client'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { SearchModal } from './search-modal'

export function SearchTrigger() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wide border border-foreground dark:border-[#FAFAFA] hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] transition-colors duration-100"
        aria-label="Search"
      >
        <Search size={13} strokeWidth={1.5} />
        <span className="hidden sm:inline text-muted-foreground dark:text-[#A3A3A3]">/</span>
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  )
}
