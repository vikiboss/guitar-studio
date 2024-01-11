import { Outlet } from 'react-router-dom'
import { NavBar } from './components/nav-bar/index.tsx'
import { useTheme } from './hooks/use-theme.tsx'
import { GeistProvider, CssBaseline } from '@geist-ui/core'

export function App() {
  const { geistTheme } = useTheme()

  return (
    <GeistProvider themeType={geistTheme}>
      <CssBaseline />
      <div className='h-screen w-screen'>
        <NavBar />
        <div className='mt-20 flex justify-center px-4'>
          <div className='max-w-[880px] w-full lg:w-[72vw]'>
            <Outlet />
          </div>
        </div>
      </div>
    </GeistProvider>
  )
}
