import { useTranslation } from 'react-i18next'

export function Home() {
  const { t } = useTranslation(['nav'])

  return <h2>{t('nav:home')}</h2>
}
