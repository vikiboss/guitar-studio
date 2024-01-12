import { useEffect } from 'react'

import { store } from '@/store'

import type { Theme } from '@/store'

export const useTheme = () => {
  const { theme, isSystemDark } = store.useState()

  const isThemeSystem = theme === 'system'
  const isDark = theme === 'dark' || (isThemeSystem && isSystemDark)

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      store.mutate.isSystemDark = event.matches
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isThemeSystem ? isSystemDark : isDark)
    localStorage.setItem('theme', isThemeSystem ? 'system' : theme)
  }, [theme, isSystemDark])

  return {
    /** options: `light`, `dark` or `system` */
    theme,
    /** options: `light` or `dark` */
    geistTheme: isThemeSystem ? (isSystemDark ? 'dark' : 'light') : theme,

    isDark,
    isSystem: isThemeSystem,

    setTheme: (t: Theme) => (store.mutate.theme = t),
  } as const
}
