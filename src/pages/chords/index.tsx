import { useTranslation } from 'react-i18next'

export function Chords() {
  const { t } = useTranslation(['nav'])

  return <h2>{t('nav:chords')}</h2>
}
