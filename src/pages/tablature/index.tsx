import { useTranslation } from 'react-i18next'

export function Tablature() {
  const { t } = useTranslation(['nav'])

  return <h2>{t('nav:tablature')}</h2>
}
