import cn from 'classnames'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GeistProvider, CssBaseline, useMediaQuery } from '@geist-ui/core'

import { NavBar } from './components/nav-bar/index.tsx'
import { useTheme } from './hooks/use-theme.tsx'
import { useRouterLink } from './hooks/use-router-link.tsx'

export function App() {
  const isLg = useMediaQuery('lg')
  const { t } = useTranslation(['nav'])
  const { pathname } = useRouterLink()
  const { geistTheme } = useTheme()

  const nav = (pathname === '/' ? '/home' : pathname).replace('/', '')

  return (
    <GeistProvider themeType={geistTheme}>
      <CssBaseline />
      <div className='h-screen w-screen'>
        <NavBar />
        <div className='pt-20 flex justify-center px-4'>
          <div className='max-w-[880px] w-full lg:w-[72vw]'>
            <div className={cn('flex items-center', isLg ? '' : 'justify-center')}>
              <h2>{t(`nav:${nav}` as never)}</h2>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </GeistProvider>
  )
}
