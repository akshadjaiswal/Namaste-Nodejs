import fs from 'fs'
import path from 'path'
import type { Chapter, ChapterMeta, TocHeading, Season } from '@/types/chapter'

const CONTENT_ROOT = path.join(process.cwd(), '..')

function getAllChapterDirs(): string[] {
  const entries = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory() && e.name.startsWith('Chapter'))
    .map((e) => e.name)
    .sort((a, b) => {
      const aKey = getSortKey(a)
      const bKey = getSortKey(b)
      if (aKey.season !== bKey.season) return aKey.season - bKey.season
      return aKey.num - bKey.num
    })
}

function getSortKey(dirName: string): { season: number; num: number } {
  const match = dirName.match(/^Chapter\s+(S(\d)\s+)?(\d+)/)
  if (!match) return { season: 1, num: 0 }
  const season = match[2] ? parseInt(match[2]) : 1
  const num = parseInt(match[3])
  return { season, num }
}

function parseDirName(dirName: string): {
  season: 1 | 2 | 3
  number: string
  title: string
} {
  // Pattern: "Chapter (S2 |S3 )?(\d+)\s*[-\s]+\s*(.*)"
  const match = dirName.match(
    /^Chapter\s+(S(\d)\s+)?(\d+)\s*[-–]\s*(.+)$/
  )
  if (match) {
    const season = (match[2] ? parseInt(match[2]) : 1) as 1 | 2 | 3
    const num = match[3].padStart(2, '0')
    const number = season === 1 ? num : `S${season} ${num}`
    const title = match[4].trim()
    return { season, number, title }
  }

  // Fallback for dirs without dash separator like "Chapter S2 01 Microservices..."
  const fallback = dirName.match(
    /^Chapter\s+(S(\d)\s+)?(\d+)\s+(.+)$/
  )
  if (fallback) {
    const season = (fallback[2] ? parseInt(fallback[2]) : 1) as 1 | 2 | 3
    const num = fallback[3].padStart(2, '0')
    const number = season === 1 ? num : `S${season} ${num}`
    const title = fallback[4].trim()
    return { season, number, title }
  }

  return { season: 1, number: '00', title: dirName }
}

export function dirNameToSlug(dirName: string): string {
  const { season, number, title } = parseDirName(dirName)
  const prefix = season === 1 ? number : `s${season}-${number.replace('S', '').replace(/\s+/g, '')}`
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${prefix}-${titleSlug}`
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = []
  const lines = markdown.split('\n')

  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+?)\s*$/)
    if (!match) continue

    const level = match[1].length
    // Strip ** bold markers and other markdown formatting
    let text = match[2]
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      .trim()

    headings.push({
      text,
      slug: slugify(text),
      level,
    })
  }

  return headings
}

function getSeasonLabel(season: 1 | 2 | 3): string {
  const labels: Record<number, string> = {
    1: 'Season 1',
    2: 'Season 2',
    3: 'Season 3',
  }
  return labels[season]
}

export function getChapterBySlug(slug: string): Chapter {
  const dirs = getAllChapterDirs()
  const dirName = dirs.find((d) => dirNameToSlug(d) === slug)

  if (!dirName) {
    throw new Error(`Chapter not found for slug: ${slug}`)
  }

  const readmePath = path.join(CONTENT_ROOT, dirName, 'README.md')
  const content = fs.readFileSync(readmePath, 'utf-8')
  const { season, number, title } = parseDirName(dirName)
  const headings = extractHeadings(content)

  return {
    slug,
    dirName,
    title,
    number,
    season,
    seasonLabel: getSeasonLabel(season),
    content,
    headings,
  }
}

export function getAllChapters(): ChapterMeta[] {
  const dirs = getAllChapterDirs()
  return dirs.map((dirName) => {
    const { season, number, title } = parseDirName(dirName)
    return {
      slug: dirNameToSlug(dirName),
      dirName,
      title,
      number,
      season,
      seasonLabel: getSeasonLabel(season),
    }
  })
}

export function getSeasons(): Season[] {
  const chapters = getAllChapters()

  const seasonDescriptions: Record<number, string> = {
    1: 'Foundations of Node.js — Runtime, V8 Engine, libuv, Event Loop, Servers & Databases',
    2: 'Building DevTinder — Full-stack application with Express, MongoDB, Authentication & React UI',
    3: 'Deployment & DevOps — AWS, Nginx, Custom Domains',
  }

  const grouped = new Map<number, ChapterMeta[]>()
  for (const ch of chapters) {
    const existing = grouped.get(ch.season) || []
    existing.push(ch)
    grouped.set(ch.season, existing)
  }

  return ([1, 2, 3] as const).map((num) => ({
    number: num,
    label: `Season ${num}`,
    description: seasonDescriptions[num],
    chapters: grouped.get(num) || [],
  }))
}
