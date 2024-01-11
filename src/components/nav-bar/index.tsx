import { Button } from '@geist-ui/core'
import { Sun, Monitor, Moon } from '@geist-ui/icons'

import { useTheme } from '@/hooks/use-theme'
import { useRouterLink } from '@/hooks/use-router-link'
import { useTranslation } from 'react-i18next'

export function NavBar() {
  const { t } = useTranslation('nav')
  const { Link } = useRouterLink()
  const { isDark, isSystem, setTheme } = useTheme()

  const nextTheme = isSystem ? 'light' : isDark ? 'system' : 'dark'

  return (
    <div className='w-full flex items-center justify-center relative'>
      <div className='h-11 top-4 px-2 fixed flex items-center justify-between rounded-2 w-[calc(100vw-2rem)] mx-4 lg:w-[800px] bg-white dark:bg-dark shadow-md'>
        <div className='flex items-center gap-2'>
          <Link className='flex items-center' to='/'>
            <Button scale={4 / 9} auto placeholder='navigate to home'>
              {t('home')}
            </Button>
          </Link>
          <Link className='flex items-center' to='/tuner'>
            <Button scale={4 / 9} auto placeholder='navigate to tuner'>
              {t('tuner')}
            </Button>
          </Link>
          <Link className='flex items-center' to='/metronome'>
            <Button scale={4 / 9} auto placeholder='navigate to metronome'>
              {t('metronome')}
            </Button>
          </Link>
          <Link className='flex items-center' to='/tablature'>
            <Button scale={4 / 9} auto placeholder='navigate to tablature'>
              {t('tablature')}
            </Button>
          </Link>
          <Link className='flex items-center' to='/chords'>
            <Button scale={4 / 9} auto placeholder='navigate to chords'>
              {t('chords')}
            </Button>
          </Link>
          <Link className='flex items-center' to='/pitch-training'>
            <Button scale={4 / 9} auto placeholder='navigate to pitch training'>
              {t('pitch-training')}
            </Button>
          </Link>
        </div>
        <Button
          onClick={() => setTheme(nextTheme)}
          iconRight={isSystem ? <Monitor /> : isDark ? <Moon /> : <Sun />}
          scale={1 / 3}
          auto
          px={0.6}
          placeholder='switch theme'
        />
      </div>
    </div>
  )
}
