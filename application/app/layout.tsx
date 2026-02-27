import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })
import { QueryProvider } from '@/lib/query-provider'

export const metadata: Metadata = {
  title: 'application',
  description: 'Built with DevStart CLI',
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
    <html lang="en">
      <body className={inter.className}><QueryProvider>{children}</QueryProvider></body>
    </html>
  )
}
