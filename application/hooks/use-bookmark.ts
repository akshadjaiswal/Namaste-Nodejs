'use client'
import { useState, useEffect, useCallback } from 'react'

const LAST_VISITED_KEY = 'nn_last_visited'
const BOOKMARK_KEY = 'nn_bookmark'
const COMPLETED_KEY = 'nn_completed'

function dispatch(key: string) {
  window.dispatchEvent(new StorageEvent('storage', { key }))
}

export function useLastVisited(slug: string) {
  useEffect(() => {
    try {
      localStorage.setItem(LAST_VISITED_KEY, slug)
      dispatch(LAST_VISITED_KEY)
    } catch {}
  }, [slug])
}

export function useBookmark(slug: string) {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    function sync(e?: StorageEvent) {
      if (e && e.key !== BOOKMARK_KEY) return
      try { setBookmarked(localStorage.getItem(BOOKMARK_KEY) === slug) } catch {}
    }
    sync()
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [slug])

  const toggle = useCallback(() => {
    try {
      const next = !bookmarked
      if (next) {
        localStorage.setItem(BOOKMARK_KEY, slug)
      } else {
        localStorage.removeItem(BOOKMARK_KEY)
      }
      setBookmarked(next)
      dispatch(BOOKMARK_KEY)
    } catch {}
  }, [bookmarked, slug])

  return { bookmarked, toggle }
}

export function useContinueReading() {
  const [state, setState] = useState<{ lastVisited: string | null; bookmark: string | null }>({
    lastVisited: null,
    bookmark: null,
  })

  useEffect(() => {
    function sync(e?: StorageEvent) {
      if (e && e.key !== BOOKMARK_KEY && e.key !== LAST_VISITED_KEY) return
      try {
        setState({
          lastVisited: localStorage.getItem(LAST_VISITED_KEY),
          bookmark: localStorage.getItem(BOOKMARK_KEY),
        })
      } catch {}
    }
    sync()
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  return state
}

export function useCompletedChapters() {
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    function sync(e?: StorageEvent) {
      if (e && e.key !== COMPLETED_KEY) return
      try {
        const raw = localStorage.getItem(COMPLETED_KEY)
        setCompleted(raw ? JSON.parse(raw) : [])
      } catch { setCompleted([]) }
    }
    sync()
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const isCompleted = useCallback((slug: string) => completed.includes(slug), [completed])

  const toggle = useCallback((slug: string) => {
    const next = completed.includes(slug)
      ? completed.filter((s) => s !== slug)
      : [...completed, slug]
    setCompleted(next)
    try {
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(next))
      dispatch(COMPLETED_KEY)
    } catch {}
  }, [completed])

  return { completed, isCompleted, toggle }
}
