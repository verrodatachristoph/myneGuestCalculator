import { useState, useEffect, useMemo } from 'react'

type Theme = 'light' | 'dark' | 'system'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system'
    }
    return 'system'
  })

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to DOM
  useEffect(() => {
    const root = window.document.documentElement
    const resolvedTheme = theme === 'system' ? systemTheme : theme

    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
    localStorage.setItem('theme', theme)
  }, [theme, systemTheme])

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'system') {
        return systemTheme === 'dark' ? 'light' : 'dark'
      }
      return current === 'dark' ? 'light' : 'dark'
    })
  }

  const isDark = useMemo(() => {
    return theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  }, [theme, systemTheme])

  return { theme, setTheme, toggleTheme, isDark }
}
