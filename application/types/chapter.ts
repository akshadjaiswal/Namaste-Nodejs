export interface TocHeading {
  text: string
  slug: string
  level: number
}

export interface Chapter {
  slug: string
  dirName: string
  title: string
  number: string
  season: 1 | 2 | 3
  seasonLabel: string
  content: string
  headings: TocHeading[]
}

export type ChapterMeta = Omit<Chapter, 'content' | 'headings'>

export interface Season {
  number: 1 | 2 | 3
  label: string
  description: string
  chapters: ChapterMeta[]
}
