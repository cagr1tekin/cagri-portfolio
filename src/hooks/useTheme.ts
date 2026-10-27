'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Theme } from '@/types'

const THEMES: Theme[] = ['mono', 'glassmorphism', 'bold']
const STORAGE_KEY = 'ct-theme'
const DEFAULT_THEME: Theme = 'mono'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const stored = raw as Theme | null
    const initial = stored && THEMES.includes(stored) ? stored : DEFAULT_THEME
    setThemeState(initial)
    document.documentElement.setAttribute('data-theme', initial)
    setMounted(true)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.setAttribute('data-theme', next)
  }, [])

  const cycleTheme = useCallback(() => {
    setThemeState(prev => {
      const idx = THEMES.indexOf(prev)
      const next = THEMES[(idx + 1) % THEMES.length]
      localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.setAttribute('data-theme', next)
      return next
    })
  }, [])

  return { theme, setTheme, cycleTheme, mounted, themes: THEMES }
}
