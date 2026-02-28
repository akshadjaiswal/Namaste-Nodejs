import type { Metadata, Viewport } from 'next'
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

const siteUrl = 'https://namaste-nodejs.vercel.app'

export const metadata: Metadata = {
  title: {
    default: 'Namaste Node.js',
    template: '%s — Namaste Node.js',
  },
  description:
    'Complete Node.js learning documentation — 34 chapters across 3 seasons, from fundamentals to deployment.',
  icons: {
    icon: '/icon.svg',
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Namaste Node.js',
    description:
      'Complete Node.js learning documentation — 34 chapters across 3 seasons.',
    url: siteUrl,
    siteName: 'Namaste Node.js',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Namaste Node.js',
    description:
      'Complete Node.js learning documentation — 34 chapters across 3 seasons.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
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
