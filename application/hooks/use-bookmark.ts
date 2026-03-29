'use client'
import { useState, useEffect, useCallback } from 'react'

const LAST_VISITED_KEY = 'nn_last_visited'
const BOOKMARK_KEY = 'nn_bookmark'

export function useLastVisited(slug: string) {
  useEffect(() => {
    try {
      localStorage.setItem(LAST_VISITED_KEY, slug)
    } catch {}
  }, [slug])
}

export function useBookmark(slug: string) {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    try {
      setBookmarked(localStorage.getItem(BOOKMARK_KEY) === slug)
    } catch {}
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
    try {
      setState({
        lastVisited: localStorage.getItem(LAST_VISITED_KEY),
        bookmark: localStorage.getItem(BOOKMARK_KEY),
      })
    } catch {}
  }, [])

  return state
}
