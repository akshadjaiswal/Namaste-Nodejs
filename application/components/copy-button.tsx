'use client'
import { useState } from 'react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 font-mono text-[10px] tracking-widest uppercase px-2 py-1 border border-border-light dark:border-[#2A2A2A] bg-background dark:bg-[#1e1e1e] hover:bg-foreground hover:text-background dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] transition-colors duration-100"
      aria-label="Copy code"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}
