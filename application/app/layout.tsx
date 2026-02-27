import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Namaste Node.js',
  description:
    'Complete Node.js learning documentation — 34 chapters across 3 seasons, from fundamentals to deployment.',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
    >
      <body className="font-body bg-background text-foreground antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
