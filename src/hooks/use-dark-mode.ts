import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const [theme, setTheme] = useState(localStorage.theme ?? systemTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, setTheme] as const
}
