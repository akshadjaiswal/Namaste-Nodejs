# CLAUDE.md — Namaste Node.js Documentation App

This file gives Claude (and any AI assistant) the context needed to work effectively on this Next.js documentation app.

## What this app is

A statically generated documentation site built with Next.js 16. It reads Node.js learning notes from the parent repository and presents them as a navigable, readable documentation site. There are 35 chapters total across 3 seasons.

The app lives at: `Namaste-Nodejs/application/`
The parent repo root (content source) is: `Namaste-Nodejs/` (one level up via `process.cwd() + '/...'`)

## Content source — read this carefully

Content is NOT stored inside `application/`. It is read at build time from the parent repository:

| Season | Source | How parsed |
|--------|--------|------------|
| Season 1 (13 chapters) | `../Chapter 01 - Title/README.md` … `../Chapter 13 - Title/README.md` | Directory scan — each directory is one chapter page |
| Season 2 (19 chapters) | `../Chapter S2 01 Title/README.md` … `../Chapter S2 19 Title/README.md` | Same directory scan, `S2` prefix distinguishes season |
| Season 3 (3 chapters) | `../Chapter S3 01 Title/README.md` … `../Chapter S3 03 Title/README.md` | Same pattern, `S3` prefix |

The entire parsing logic lives in `lib/chapters.ts`. Do NOT move content files into `application/`.

## Directory naming convention

Chapter directories are inconsistent — some have dash separators, some don't. The parser handles both:

```
Pattern 1 (with dash):    Chapter 01 - Introduction to NodeJs
Pattern 2 (no dash):      Chapter 02 JS on the Server
Season 2 (no dash):       Chapter S2 01 Microservices vs Monolith - How to build a project
Season 3:                 Chapter S3 01 Lanching an AWS Instance and Deploying frontend
```

Primary regex: `/^Chapter\s+(S(\d)\s+)?(\d+)\s*[-–]\s*(.+)$/`
Fallback regex: `/^Chapter\s+(S(\d)\s+)?(\d+)\s+(.+)$/`

Both are handled in `parseDirName()` in `lib/chapters.ts`.

## Architecture

```
application/
├── app/
│   ├── layout.tsx              # Root layout: sidebar + header + children
│   ├── page.tsx                # Home: hero + season grids
│   ├── globals.css             # Tailwind base + .shiki styling + .author-link
│   ├── error.tsx               # Error boundary (client component)
│   ├── robots.ts               # robots.txt metadata
│   ├── sitemap.ts              # Dynamic sitemap from getAllChapters()
│   ├── opengraph-image.tsx     # OG image (site-level)
│   └── chapters/[slug]/
│       ├── page.tsx            # Chapter page with TOC + nav + ReadingProgress
│       ├── loading.tsx         # Skeleton loading state
│       ├── not-found.tsx       # 404 for bad slugs
│       └── opengraph-image.tsx # Per-chapter OG image (1200×630, Node.js green)
├── components/
│   ├── sidebar.tsx             # Server wrapper — calls getSeasons()
│   ├── sidebar-client.tsx      # Client: collapsible nav, mobile overlay
│   ├── header.tsx              # Sticky header with GitHub stars + SearchTrigger + attribution
│   ├── markdown-renderer.tsx   # Async RSC: Shiki-highlighted react-markdown
│   ├── table-of-contents.tsx   # Client: sticky TOC with intersection observer
│   ├── chapter-nav.tsx         # Prev/Next chapter links
│   ├── copy-button.tsx         # 'use client' — copy-to-clipboard for code blocks
│   ├── reading-progress.tsx    # 'use client' — amber scroll progress bar (chapter pages only)
│   ├── search-modal.tsx        # 'use client' — Fuse.js search modal (fetch + fuzzy search)
│   ├── search-trigger.tsx      # 'use client' — search icon button + `/` global shortcut
│   ├── bookmark-button.tsx     # 'use client' — bookmark toggle; also records last visited
│   └── continue-reading.tsx    # 'use client' — sidebar continue reading / bookmark link
├── hooks/
│   └── use-bookmark.ts         # useLastVisited, useBookmark, useContinueReading hooks
├── lib/
│   ├── chapters.ts             # ALL content parsing — the core of the app
│   ├── github.ts               # Fetches GitHub star count (cached 1h)
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
├── types/
│   └── chapter.ts              # Chapter, ChapterMeta, Season, TocHeading interfaces
├── scripts/
│   ├── copy-chapter-images.mjs    # Copies chapter images to public/chapter-images/
│   └── generate-search-index.mjs  # Writes public/search-index.json
└── public/
    ├── icon.svg                # Favicon
    ├── fonts/
    │   └── PlayfairDisplay.ttf # Font for OG image generation — do NOT delete
    ├── chapter-images/         # Copied chapter images (auto-generated — do not edit)
    └── search-index.json       # 35-entry search index (auto-generated — do not edit)
```

### Key exported functions from `lib/chapters.ts`

- `getAllChapters(): ChapterMeta[]` — flat list of all 35 chapters in order
- `getChapterBySlug(slug: string): Chapter | null` — full chapter with content + headings + readTime
- `getSeasons(): Season[]` — 3 seasons with nested chapter lists
- `dirNameToSlug(dirName: string): string` — exported; used by `generate-search-index.mjs`
- `getSearchIndex()` — flat list of `{ slug, title, number, seasonLabel }` (used by search index script)

### Slug format

Season 1 uses the zero-padded number as prefix directly:
- `01-introduction-to-nodejs`
- `02-js-on-the-server`
- `13-creating-a-database-mongodb`

Season 2 uses `s2-` prefix:
- `s2-01-microservices-vs-monolith-how-to-build-a-project`
- `s2-19-devtinder-ui-part-5`

Season 3 uses `s3-` prefix:
- `s3-01-lanching-an-aws-instance-and-deploying-frontend`

## Data types

### `Chapter` interface (`types/chapter.ts`)
```ts
{
  slug: string
  dirName: string
  title: string
  number: string        // "01", "S2 01", "S3 01"
  season: 1 | 2 | 3
  seasonLabel: string   // "Season 1", "Season 2", "Season 3"
  content: string       // Full markdown content
  headings: TocHeading[]
  readTime: number      // Minutes to read, computed at build time (ceil(words/200))
}
```

### `ChapterMeta` type
`Omit<Chapter, 'content' | 'headings' | 'readTime'>` — used in sidebar and home page.

## Design system

- **Framework**: Tailwind CSS 3 with custom config in `tailwind.config.js`
- **Accent color**: `#E8A000` (amber) — sidebar active states, code block left borders, reading progress bar
- **Background**: `#FFFFFF`, **Foreground**: `#000000`
- **Fonts** (via `next/font/google`):
  - Heading: Playfair Display (`--font-heading`)
  - Body: Source Serif 4 (`--font-body`)
  - Mono: JetBrains Mono (`--font-mono`)
- **No border-radius, no box-shadow** — everything is sharp-cornered by design (set to `0` in Tailwind config)

## Dependencies (notable)

| Package | Purpose |
|---------|---------|
| `react-markdown` | Markdown → React rendering pipeline |
| `remark-gfm` | GitHub-flavored markdown (tables, strikethrough, etc.) |
| `rehype-slug` | Auto anchor IDs on headings |
| `rehype-raw` | Allows raw HTML output from Shiki to pass through react-markdown |
| `shiki` | Build-time syntax highlighting via `codeToHtml()` |
| `fuse.js` | Client-side fuzzy search in `SearchModal` |
| `lucide-react` | Icons (Github, Star, Search, etc.) |

## Build scripts

```bash
# From application/ directory
npm run dev       # Start dev server at localhost:3000
npm run build     # Runs prebuild (images + search index) then Next.js build
npm start         # Serve production build
npm run lint      # ESLint
```

The `prebuild` script runs two scripts:
1. `node scripts/copy-chapter-images.mjs` — copies images from chapter dirs to `public/chapter-images/`
2. `node scripts/generate-search-index.mjs` — writes `public/search-index.json`

Both must run before the build.

## Syntax highlighting — how it works

`MarkdownRenderer` is an **async** React Server Component. Before rendering, it pre-processes the markdown string with `codeToHtml()` from Shiki (theme: `github-light`), replacing fenced code blocks with highlighted HTML wrapped in `<div data-shiki>`. The `rehype-raw` plugin allows this HTML to pass through the react-markdown pipeline. The `div` renderer in `components` detects `data-shiki` and wraps the output with the amber left border + `CopyButton`.

The `pre` renderer checks `className?.includes('shiki')` — if true, it passes through as a plain `<pre>` (the parent div renderer already handles the wrapper). This prevents double-wrapping.

The `.shiki` CSS class in `globals.css` overrides Shiki's default background to `#fafafa`.

Code block wrapper classes: `overflow-x-auto bg-[#fafafa] border border-border-light border-l-[3px] border-l-accent px-5 pb-5 pt-10 shiki-wrapper`

## Search — how it works

- At `prebuild`, `scripts/generate-search-index.mjs` writes `public/search-index.json` (35 entries).
- Each entry now includes `content` — stripped plain text of the chapter body — in addition to `slug`, `title`, `number`, and `seasonLabel`.
- `SearchTrigger` (in header) listens for the `/` key globally and manages open state.
- `SearchModal` fetches `/search-index.json` once on open, initialises Fuse.js, and searches as the user types.
- Fuse.js config: `ignoreLocation: true`, `includeMatches: true`, `threshold: 0.3`, weighted keys: `title 0.6 / content 0.3 / seasonLabel 0.1`.
- Results show a context snippet around the matched term, highlighted in amber.
- Keyboard: `↑`/`↓` to move, `Enter` to navigate, `Esc` to close.

## Callout blocks — how they work

Markdown supports GitHub-style callout syntax inside `MarkdownRenderer`:

```
> [!NOTE]
> This is a note.

> [!TIP]
> Helpful tip here.

> [!WARNING]
> Caution advised.

> [!IMPORTANT]
> Key information.

> [!CAUTION]
> Dangerous action.
```

`markdown-renderer.tsx` detects blockquotes whose first paragraph starts with `[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!IMPORTANT]`, or `[!CAUTION]` and renders them as styled callout boxes with a coloured left border, an icon, and a label. Each variant has its own color (e.g., blue for NOTE, green for TIP, amber for WARNING, purple for IMPORTANT, red for CAUTION).

## Bookmarks — how they work

`hooks/use-bookmark.ts` provides three hooks:
- `useLastVisited()` — reads/writes `nn_last_visited` in localStorage (slug of the last chapter page opened)
- `useBookmark()` — reads/writes `nn_bookmark` in localStorage (slug of the explicitly bookmarked chapter)
- `useContinueReading()` — derived hook combining both; used by `ContinueReading`

`BookmarkButton` (`components/bookmark-button.tsx`) is a `'use client'` component placed on each chapter page. It toggles the `nn_bookmark` key and also updates `nn_last_visited` on mount.

`ContinueReading` (`components/continue-reading.tsx`) is a `'use client'` component rendered in the sidebar. It reads both localStorage keys and shows a "Continue reading" link to `nn_last_visited` and/or a "Bookmarked" link to `nn_bookmark`.

localStorage key names for this app: `nn_last_visited`, `nn_bookmark`.

## Per-chapter OG images — how they work

`app/chapters/[slug]/opengraph-image.tsx` generates a unique 1200×630 OG image for every chapter at build time using Next.js's `ImageResponse` API.

- It calls `generateStaticParams` (re-exported from `page.tsx`) so Next.js knows which slugs to pre-render.
- The design features the chapter title in Playfair Display, a ghost chapter number watermark, and the Node.js green accent color.
- The font is loaded from `public/fonts/PlayfairDisplay.ttf` at runtime — **do not delete this file** or OG image generation will fail.

## Mobile layout

- Hamburger button: `fixed top-3 left-4 z-50 md:hidden` — vertically aligned with header `py-3`
- Header main row: `pl-14 pr-6 md:px-12 py-3` — `pl-14` clears the hamburger on mobile
- Header attribution: `hidden sm:block` in main row (desktop); `sm:hidden` second row below buttons (mobile)
- GitHub star count: `hidden sm:block` — hidden on mobile to prevent overflow
- Mobile drawer: `fixed inset-0 z-50`, panel `w-72`, backdrop closes on click

## TOC duplicate heading dedup

`extractHeadings()` in `lib/chapters.ts` uses a `slugCount: Map<string, number>` to deduplicate slugs. First occurrence keeps the base slug (e.g., `example`), subsequent ones get `-1`, `-2` suffix (e.g., `example-1`). This matches `rehype-slug`'s behavior so TOC links point to the correct anchors.

## UI patterns

- **Sidebar active item**: `border-l-4 border-accent` (inactive hover uses `border-l-2`)
- **Sidebar logo**: `group-hover:opacity-70 transition-opacity` — clearly interactive link to home
- **Chapter page metadata**: stacked `flex-col gap-0.5` — season label in `text-accent` (xs mono uppercase), read time below in `text-muted-foreground`
- **Chapter nav**: Next link is inverted (`bg-foreground text-background`) by default as the primary action; mobile layout uses `flex-col-reverse` so Next appears first
- **Home page**: tighter padding (`py-10 md:py-16`), season sections have `pl-4 border-l-4 border-accent` left accent border, chapter cards contain a ghost number watermark (`text-5xl text-foreground/5`)
- **Season sections**: `mb-14` gap between seasons

## Sister app

This app is a port of `Namaste-JavaScript/application/`. When making structural changes, check how the JS app handles the same problem. Key difference: the JS app has a Concepts section and uses a different slug prefix (`s1-ep01-`) — this app uses bare padded numbers for Season 1.

## Do not

- Do NOT move content into `application/` — it must stay sourced from the parent repo
- Do NOT add a database or CMS — all content is static and parsed at build time
- Do NOT add rounded corners or box shadows — the design is intentionally sharp
- Do NOT change the slug format — slugs are stable URLs; changing them breaks bookmarks
- Do NOT add `Co-Authored-By: Claude` to commits in this repo
- Do NOT use `@shikijs/rehype` as a rehype plugin in the `react-markdown` pipeline — it is async and will crash with `` `runSync` finished async ``. Use Shiki's `codeToHtml()` directly to pre-process the markdown string before rendering
- Do NOT edit `public/search-index.json` or `public/chapter-images/` manually — both are auto-generated at prebuild; `search-index.json` now includes a `content` field
- Do NOT delete `public/fonts/PlayfairDisplay.ttf` — it is required for per-chapter OG image generation at runtime
