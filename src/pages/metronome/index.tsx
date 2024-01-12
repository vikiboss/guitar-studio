import { useTranslation } from 'react-i18next'

export function Metronome() {
  const { t } = useTranslation(['nav'])

  return <h2>{t('nav:metronome')}</h2>
}
