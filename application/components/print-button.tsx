'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      aria-label="Print or save as PDF"
      title="Print or save as PDF"
      className="hidden md:flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase border border-foreground dark:border-[#FAFAFA] px-3 py-1.5 hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] transition-colors duration-100"
    >
      <Printer size={12} strokeWidth={1.5} />
      Print
    </button>
  )
}
