import { Tabs, Button } from '@geist-ui/core'
import { Sun, Github, Monitor, Moon } from '@geist-ui/icons'

import { useTheme } from '@/hooks/use-theme'
import { useNavigate } from 'react-router-dom'
import { useRouterLink } from '@/hooks/use-router-link'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const langMap: Record<string, string> = {
  en: 'EN',
  ja: 'JA',
  'zh-CN': 'ZH',
  'zh-TW': 'TW',
}

export function NavBar() {
  const navigate = useNavigate()
  const { pathname } = useRouterLink()
  const { i18n, t } = useTranslation('nav')
  const { isDark, isSystem, setTheme } = useTheme()

  const navList = Object.keys(i18n.options.resources?.en?.nav ?? {}) as never[]
  const langs = Object.keys(i18n.options.resources ?? {})
  const nextTheme = isSystem ? 'light' : isDark ? 'system' : 'dark'
  const nextLang = langs[(langs.indexOf(i18n.language) + 1) % langs.length]

  useEffect(() => void (!i18n.language && i18n.changeLanguage('en')), [i18n.language])

  return (
    <div id='nav' className='w-full flex items-center justify-center relative'>
      <div className='h-12 top-2 lg:top-4 px-2 fixed flex items-center justify-between rounded-2 w-[calc(100vw-2rem)] mx-4 lg:w-[880px] bg-[#eeeeee] dark:bg-dark'>
        <div className='flex items-center gap-2'>
          <Tabs
            className='max-w-[60vw] lg:max-w-[880px]'
            hideDivider
            hideBorder
            initialValue={pathname}
            onChange={path => navigate(path)}
          >
            {navList.map(nav => (
              <Tabs.Item key={nav} label={t(nav)} value={`/${nav === 'home' ? '' : nav}`} />
            ))}
          </Tabs>
        </div>
        <div className='flex items-center gap-1 lg:gap-2'>
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
