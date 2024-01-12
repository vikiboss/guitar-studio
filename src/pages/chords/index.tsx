import { Select } from '@geist-ui/core'
// import { draw } from 'vexchords'
import { useTranslation } from 'react-i18next'

import { Note, store } from './store'
import { chords } from '@/utils/chords'
import { useEffect } from 'react'

export function Chords() {
  const { t } = useTranslation(['nav'])
  const state = store.useState()

  const notes = Object.keys(chords) as Note[]
  const suffixes = chords[state.note] as { key: string; suffix: string }[]

  useEffect(() => {
    // draw('#chord-container', {
    //   chord: [
    //     [1, 2],
    //     [2, 1],
    //     [3, 2],
    //     [4, 0],
    //     [5, 'x'],
    //     [6, 'x'],
    //   ],
    // })
  }, [state.note, state.suffix])

  return (
    <>
      <h2>{t('nav:chords')}</h2>
      <div className='flex gap-4'>
        <Select
          className='text-#000000/80 dark:text-white/80'
          value={state.note}
          multiple={false}
          onChange={e => (store.mutate.note = e as Note)}
        >
          {notes.map(note => (
            <Select.Option key={note} value={note}>
              {note.replace('sharp', '#')}
            </Select.Option>
          ))}
        </Select>
        <Select
          className='text-#000000/80 dark:text-white/80'
          value={state.suffix}
          multiple={false}
          onChange={e => (store.mutate.suffix = e as string)}
        >
          {suffixes.map(suffix => (
            <Select.Option key={suffix.key} value={suffix.suffix}>
              {suffix.suffix}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div id='chord-container'></div>
    </>
  )
}
