import { useTranslation } from 'react-i18next'

import { ALink } from '@/components/a-link'

export function Home() {
  const { t } = useTranslation(['nav'])

  return (
    <div>
      <h3>Hi, there 👋!</h3>
      <p>
        This project is under developing, feel free to make suggestions at
        <ALink href='https://github.com/vikiboss/guitar-studio'>GitHub</ALink>.
      </p>

      <p>Enjoy your guitar trip!</p>
    </div>
  )
}
