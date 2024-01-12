import { useTranslation } from 'react-i18next'

export function PitchTraining() {
  const { t } = useTranslation(['nav'])

  return <h2>{t('nav:pitch-training')}</h2>
}
