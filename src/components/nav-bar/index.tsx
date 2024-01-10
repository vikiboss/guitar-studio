import { Icon } from '../icon'
import { useDarkMode } from '@/hooks/use-dark-mode'
import { useRouterLink } from '@/hooks/use-router-link'

export function NavBar() {
  const { Link } = useRouterLink()
  const [theme, setTheme] = useDarkMode()

  return (
    <div className='w-full flex items-center justify-center relative'>
      <div className='h-10 top-4 fixed flex items-center justify-between max-w-[1200px] min-w-[320px] rounded bg-white dark:bg-dark shadow'>
        <div className='flex items-center gap-2 px-2'>
          <Link
            inactiveClsName='dark:text-white text-black/72'
            activeClsName='dark:text-amber text-amber'
            to='/'
          >
            Home
          </Link>
          <Link
            inactiveClsName='dark:text-white text-black/72'
            activeClsName='dark:text-amber text-amber'
            to='/about'
          >
            About
          </Link>
        </div>

        <Icon
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          size={32}
          className='p-2 cursor-pointer'
          name={theme === 'light' ? 'moon' : 'sun'}
        />
      </div>
    </div>
  )
}
