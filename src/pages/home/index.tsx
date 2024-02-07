import { useTranslation } from 'react-i18next'
import { Github } from '@geist-ui/icons'

import { Anchor } from '@/components/anchor'

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
        <Anchor href='https://github.com/vikiboss/guitar-studio'>Open Source</Anchor> and&nbsp;
        <b>under development</b>, feel free to feedback or make suggestions at&nbsp;
        <Anchor href='https://github.com/vikiboss/guitar-studio'>
          <Github size={14} className='mr-1' />
          GitHub
        </Anchor>
        .
      </p>

      <p>Enjoy your guitar trip! 🎉</p>

      <h3>Tech Stacks</h3>
      <ul>
        <li>
          <Anchor href='https://reactjs.org/'>React</Anchor>
        </li>
        <li>
          <Anchor href='https://www.typescriptlang.org/'>TypeScript</Anchor>
        </li>
        <li>
          <Anchor href='https://unocss.dev/'>UnoCSS</Anchor>
        </li>
        <li>
          <Anchor href='https://vitejs.dev/'>Vite</Anchor>
        </li>
      </ul>
      <h3>Credits</h3>
      <p>Thanks to the following awesome projects / npm packages:</p>
      <ul>
        <li>
          <Anchor href='https://github.com/ianprime0509/pitchy'>pitchy</Anchor>
        </li>
        <li>
          <Anchor href='https://github.com/tombatossals/chords-db'>chords-db</Anchor> (
          <Anchor href='https://github.com/tombatossals/chords-db/blob/master/lib/guitar.json'>
            lib/guitar.json
          </Anchor>
          )
        </li>
        <li>
          <Anchor href='https://github.com/0xfe/vexchords'>vexchords</Anchor>
        </li>
        <li>
          <Anchor href='https://github.com/Tonejs/Tone.js'>Tone.js</Anchor>
        </li>
        <li>
          <Anchor href='https://github.com/saebekassebil/teoria'>teoria</Anchor>
        </li>
      </ul>

      <h3>License</h3>
      <p>
        <Anchor href='https://github.com/vikiboss/guitar-studio/blob/main/LICENSE'>MIT</Anchor>
      </p>
    </div>
  )
}
