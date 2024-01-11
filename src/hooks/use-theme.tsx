import { useEffect } from 'react'

import { store } from '@/store'

import type { Theme } from '@/store'

export const useTheme = () => {
  const { theme } = store.useState()

  const isDark = theme === 'dark'
  const isLight = theme === 'light'
  const isThemeSystem = theme === 'system'

  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isThemeSystem ? isSystemDark : isDark)
    localStorage.setItem('theme', isThemeSystem ? (isSystemDark ? 'dark' : 'light') : theme)
  }, [theme, isSystemDark])

  return {
    theme,
    geistTheme: isThemeSystem ? (isSystemDark ? 'dark' : 'light') : theme,

    isDark,
    isLight,
    isSystem: isThemeSystem,

    setTheme: (t: Theme) => (store.mutate.theme = t),
  } as const
}
