import { Button } from '@geist-ui/core'
import { Sun, Monitor, Moon } from '@geist-ui/icons'

import { useTheme } from '@/hooks/use-theme'
import { useRouterLink } from '@/hooks/use-router-link'

export function NavBar() {
  const { Link } = useRouterLink()
  const { isDark, isSystem, setTheme } = useTheme()

  const nextTheme = isSystem ? 'light' : isDark ? 'system' : 'dark'

  return (
    <div className='w-full flex items-center justify-center relative'>
      <div className='h-11 top-4 px-2 fixed flex items-center justify-between rounded-2 w-[calc(100vw-2rem)] mx-4 lg:w-[800px] bg-white dark:bg-dark shadow-md'>
        <div className='flex items-center gap-2'>
          <Link className='flex items-center' to='/'>
            <Button scale={4 / 9} auto placeholder='navigate to home'>
              Home
            </Button>
          </Link>
          <Link className='flex items-center' to='/about'>
            <Button scale={4 / 9} auto placeholder='navigate to about'>
              About
            </Button>
          </Link>
        </div>

        <Button
          onClick={() => setTheme(nextTheme)}
          iconRight={isSystem ? <Monitor /> : isDark ? <Moon /> : <Sun />}
          scale={2 / 3}
          auto
          px={0.6}
          placeholder='switch theme'
        />
      </div>
    </div>
  )
}
