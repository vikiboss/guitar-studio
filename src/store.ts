import { create } from './utils/create-store'

export type Theme = 'light' | 'dark' | 'system'

const isSystemInitialDark = matchMedia('(prefers-color-scheme: dark)').matches

export const store = create({
  theme: (localStorage.theme ?? isSystemInitialDark ? 'dark' : 'light') as Theme,
  isSystemDark: isSystemInitialDark,
})
