import { useTranslation } from 'react-i18next'
import { Github } from '@geist-ui/icons'

import { ALink } from '@/components/a-link'

export function Home() {
  const { t } = useTranslation(['nav'])

  return (
    <div>
      <h3>Hi, there! 👋</h3>
      <p>
        Welcome to 🎸 Guitar Studio, your <b>all-in-one</b> guitar online toolkit 🛠️.
      </p>

      <p>
        This project is&nbsp;
        <ALink href='https://github.com/vikiboss/guitar-studio'>Open Source</ALink> and&nbsp;
        <b>under developing</b>, feel free to feedback or make suggestions at&nbsp;
        <ALink href='https://github.com/vikiboss/guitar-studio'>
          <Github size={14} className='mr-1' />
          GitHub
        </ALink>
        .
      </p>

      <p>Enjoy your guitar trip! 🎉</p>

      <h3>Tech Stacks</h3>
      <ul>
        <li>
          <ALink href='https://reactjs.org/'>React</ALink>
        </li>
        <li>
          <ALink href='https://www.typescriptlang.org/'>TypeScript</ALink>
        </li>
        <li>
          <ALink href='https://unocss.dev/'>UnoCSS</ALink>
        </li>
        <li>
          <ALink href='https://vitejs.dev/'>Vite</ALink>
        </li>
      </ul>
      <h3>Credits</h3>
      <p>Thanks to the following awesome projects / npm packages:</p>
      <ul>
        <li>
          <ALink href='https://github.com/ianprime0509/pitchy'>pitchy</ALink>
        </li>
        <li>
          <ALink href='https://github.com/tombatossals/chords-db'>chords-db</ALink> (
          <ALink href='https://github.com/tombatossals/chords-db/blob/master/lib/guitar.json'>
            lib/guitar.json
          </ALink>
          )
        </li>
        <li>
          <ALink href='https://github.com/0xfe/vexchords'>vexchords</ALink>
        </li>
        <li>
          <ALink href='https://github.com/Tonejs/Tone.js'>Tone.js</ALink>
        </li>
        <li>
          <ALink href='https://github.com/saebekassebil/teoria'>teoria</ALink>
        </li>
      </ul>

      <h3>License</h3>
      <p>
        <ALink href='https://github.com/vikiboss/guitar-studio/blob/main/LICENSE'>MIT</ALink>
      </p>
    </div>
  )
}
