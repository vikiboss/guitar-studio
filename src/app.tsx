import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function App() {
  const { t, i18n } = useTranslation(['common'])
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen grid place-content-center'>
      <div>
        <h1 className='text-amber'>React + TS + Vite + UnoCSS</h1>
        <p>Happy coding!</p>
        <div>{t('i18n-test')}</div>

        <button
          onClick={() => {
            i18n.changeLanguage(i18n.language === 'en' ? 'zh-CN' : 'en')
            setCount(count + 1)
          }}
        >
          count is {count}
        </button>
      </div>
    </div>
  )
}
