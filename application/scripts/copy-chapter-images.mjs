import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const APP_ROOT = path.resolve(__dirname, '..')
const CONTENT_ROOT = path.resolve(APP_ROOT, '..')
const OUTPUT_DIR = path.join(APP_ROOT, 'public', 'chapter-images')

// Clear and recreate output dir
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true })
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

function dirNameToSlug(dirName) {
  const match = dirName.match(/^Chapter\s+(S(\d)\s+)?(\d+)\s*[-–]\s*(.+)$/)
  let season, num, title

  if (match) {
    season = match[2] ? parseInt(match[2]) : 1
    num = match[3].padStart(2, '0')
    title = match[4].trim()
  } else {
    const fallback = dirName.match(/^Chapter\s+(S(\d)\s+)?(\d+)\s+(.+)$/)
    if (fallback) {
      season = fallback[2] ? parseInt(fallback[2]) : 1
      num = fallback[3].padStart(2, '0')
      title = fallback[4].trim()
    } else {
      return dirName.toLowerCase().replace(/\s+/g, '-')
    }
  }

  const prefix = season === 1 ? num : `s${season}-${num}`
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${prefix}-${titleSlug}`
}

function copyImagesRecursive(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      copyImagesRecursive(srcPath, destDir)
    } else if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(entry.name)) {
      fs.mkdirSync(destDir, { recursive: true })
      fs.copyFileSync(srcPath, path.join(destDir, entry.name))
      console.log(`  Copied: ${entry.name}`)
    }
  }
}

const dirs = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name.startsWith('Chapter'))
  .map((d) => d.name)

let totalCopied = 0
for (const dir of dirs) {
  const slug = dirNameToSlug(dir)
  const chapterPath = path.join(CONTENT_ROOT, dir)
  const destPath = path.join(OUTPUT_DIR, slug)

  const before = totalCopied
  const entries = fs.readdirSync(chapterPath, { withFileTypes: true })
  const hasImages = entries.some(
    (e) =>
      /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(e.name) ||
      (e.isDirectory() && e.name === 'images')
  )

  if (hasImages) {
    console.log(`Processing: ${dir} -> ${slug}`)
    copyImagesRecursive(chapterPath, destPath)
  }
}

console.log('Done copying chapter images.')
