import { create } from './utils/create-store'

export type Theme = 'light' | 'dark' | 'system'

const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const store = create({
  theme: (localStorage.theme ?? systemTheme) as Theme,
})

export const changeTheme = (theme: Theme) => {
  store.mutate.theme = theme
}
