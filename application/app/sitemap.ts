import type { MetadataRoute } from 'next'
import { getAllChapters } from '@/lib/chapters'

const siteUrl = 'https://namaste-nodejs.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = getAllChapters()

  const chapterUrls = chapters.map((ch) => ({
    url: `${siteUrl}/chapters/${ch.slug}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...chapterUrls,
  ]
}
