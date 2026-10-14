'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export const THEMES = ['teal', 'violet', 'orange']
export const DEFAULT_THEME = 'teal'
const STORAGE_KEY = 'ft-theme'

const ThemeContext = createContext({ theme: DEFAULT_THEME, setTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  // Pick up whatever the no-flash inline script in <head> already chose.
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    if (THEMES.includes(current)) setTheme(current)
  }, [])

  const set = useCallback((next) => {
    if (!THEMES.includes(next)) return
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode — ignore */
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme: set }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}