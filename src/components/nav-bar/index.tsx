import { Button } from '@geist-ui/core'
import { Sun, Github, Monitor, Moon } from '@geist-ui/icons'

import { useTheme } from '@/hooks/use-theme'
import { useRouterLink } from '@/hooks/use-router-link'
import { useTranslation } from 'react-i18next'

const langMap: Record<string, string> = {
  en: 'EN',
  jp: 'JP',
  'zh-CN': 'ZH',
  'zh-TW': 'TW',
}

export function NavBar() {
  const { Link } = useRouterLink()
  const { i18n, t } = useTranslation('nav')
  const { isDark, isSystem, setTheme } = useTheme()

  const langs = Object.keys(i18n.options.resources || {})
  const nextTheme = isSystem ? 'light' : isDark ? 'system' : 'dark'
  const nextLang = langs[(langs.indexOf(i18n.language) + 1) % langs.length]

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
        <div className='flex items-center gap-2'>
          <Button
            onClick={() => window.open('https://github.com/vikiboss/guitar-studio', '_blank')}
            iconRight={<Github />}
            scale={1 / 3}
            auto
            px={0.6}
            placeholder='switch theme'
          />

          <Button
            onClick={() => setTheme(nextTheme)}
            iconRight={isSystem ? <Monitor /> : isDark ? <Moon /> : <Sun />}
            scale={1 / 3}
            auto
            px={0.6}
            placeholder='switch theme'
          />
          <Button
            onClick={() => i18n.changeLanguage(nextLang)}
            scale={1 / 3}
            auto
            px={0.6}
            className='font-mono tracking-widest'
            placeholder='switch theme'
          >
            {langMap[i18n.language]}
          </Button>
        </div>
      </div>
    </div>
  )
}
