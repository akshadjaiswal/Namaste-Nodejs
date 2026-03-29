// @ts-check
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_ROOT = path.join(__dirname, '..', '..')

function getSortKey(dirName) {
  const match = dirName.match(/^Chapter\s+(S(\d)\s+)?(\d+)/)
  if (!match) return { season: 1, num: 0 }
  const season = match[2] ? parseInt(match[2]) : 1
  const num = parseInt(match[3])
  return { season, num }
}

function parseDirName(dirName) {
  const match = dirName.match(/^Chapter\s+(S(\d)\s+)?(\d+)\s*[-–]\s*(.+)$/)
  if (match) {
    const season = match[2] ? parseInt(match[2]) : 1
    const num = match[3].padStart(2, '0')
    const number = season === 1 ? num : `S${season} ${num}`
    const title = match[4].trim()
    return { season, number, title }
  }
  const fallback = dirName.match(/^Chapter\s+(S(\d)\s+)?(\d+)\s+(.+)$/)
  if (fallback) {
    const season = fallback[2] ? parseInt(fallback[2]) : 1
    const num = fallback[3].padStart(2, '0')
    const number = season === 1 ? num : `S${season} ${num}`
    const title = fallback[4].trim()
    return { season, number, title }
  }
  return { season: 1, number: '00', title: dirName }
}

function dirNameToSlug(dirName) {
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

const entries = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })
const chapterDirs = entries
  .filter((e) => e.isDirectory() && e.name.startsWith('Chapter'))
  .map((e) => e.name)
  .sort((a, b) => {
    const aKey = getSortKey(a)
    const bKey = getSortKey(b)
    if (aKey.season !== bKey.season) return aKey.season - bKey.season
    return aKey.num - bKey.num
  })

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')        // fenced code blocks
    .replace(/`[^`]+`/g, '')               // inline code
    .replace(/^#{1,6}\s+/gm, '')           // heading markers
    .replace(/!\[.*?\]\(.*?\)/g, '')        // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → keep text
    .replace(/https?:\/\/\S+/g, '')        // bare URLs
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1') // bold/italic
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')   // underscore bold/italic
    .replace(/^>\s*/gm, '')                // blockquotes
    .replace(/^---+$/gm, '')               // horizontal rules
    .replace(/^[-*+]\s+/gm, '')            // list bullets
    .replace(/^\d+\.\s+/gm, '')            // numbered lists
    .replace(/\s+/g, ' ')                  // collapse whitespace
    .trim()
}

const index = chapterDirs.map((dirName) => {
  const { season, number, title } = parseDirName(dirName)
  const readmePath = path.join(CONTENT_ROOT, dirName, 'README.md')
  let content = ''
  try {
    const raw = fs.readFileSync(readmePath, 'utf-8')
    content = stripMarkdown(raw)
  } catch {
    // no README — content stays empty
  }
  return {
    slug: dirNameToSlug(dirName),
    title,
    number,
    seasonLabel: `Season ${season}`,
    content,
  }
})

const outPath = path.join(__dirname, '..', 'public', 'search-index.json')
fs.writeFileSync(outPath, JSON.stringify(index, null, 2))
console.log(`✓ search-index.json written (${index.length} entries)`)
