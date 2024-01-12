import cn from 'classnames'
import { draw } from 'vexchords'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Select } from '@geist-ui/core'

import { store } from './store'
import { Note, chords } from '@/utils/chords'
import { useTheme } from '@/hooks/use-theme'
import { ALink } from '@/components/a-link'

export function Chords() {
  const { t } = useTranslation(['nav'])
  const state = store.useState()
  const isLg = useMediaQuery('lg')
  const { isDark } = useTheme()

  const notes = Object.keys(chords)
  const suffixes = chords[state.note]

  const {
    positions = [],
    suffix = '',
    key = '',
  } = chords[state.note].find(c => c.suffix === state.suffix) || {}

  const getDomId = (fingers: number[]) => {
    return `${
      key.replace('#', '_up_') +
      suffix.replace('#', '_up_').replace('/', '_slash_') +
      fingers.join('_')
    }`
  }

  useEffect(() => {
    positions.forEach(position => {
      const domId = getDomId(position.fingers)

      const el = document.getElementById(domId)
      el && (el.innerHTML = '')

      draw(
        `#${domId}`,
        {
          chord: position.frets.map((it, idx) => [
            6 - idx,
            it === -1 ? 'x' : it,
            position.fingers[idx] || '',
          ]),
        },
        {
          width: isLg ? 160 : 160,
          height: isLg ? 240 : 240,
          fontSize: isLg ? '16' : '16',
          fontWeight: 'medium',
          textColor: isDark ? '#ffffff80' : '#00000080',
          labelColor: isDark ? '#000000' : '#ffffff',
          strokeColor: isDark ? '#cccccc' : '#333333',
        },
      )
    })
  }, [positions, isLg, isDark])

  return (
    <>
      <div className={cn('flex gap-4 mt-4', isLg ? '' : 'justify-center')}>
        <Select
          className='text-#000000/80 dark:text-white/80 min-w-[36vw]! lg:min-w-[160px]!'
          value={state.note}
          multiple={false}
          onChange={e => (store.mutate.note = e as Note)}
        >
          {notes.map(note => (
            <Select.Option className='text-4!' key={note} value={note}>
              {note.replace('sharp', '#')}
            </Select.Option>
          ))}
        </Select>
        <Select
          className='text-#000000/80 dark:text-white/80 min-w-[36vw]! lg:min-w-[160px]!'
          value={state.suffix}
          multiple={false}
          onChange={e => (store.mutate.suffix = e as string)}
        >
          {suffixes.map(suffix => (
            <Select.Option className='text-4!' key={suffix.suffix} value={suffix.suffix}>
              {suffix.suffix}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className='grid grid-cols-4 gap-2 mt-4'>
        {positions.map(position => (
          <div
            key={position.fingers.join('_')}
            id={getDomId(position.fingers)}
            className={cn('flex items-center justify-center', isLg ? 'col-span-1' : 'col-span-2')}
          />
        ))}
      </div>

      <div className='flex gap-1 text-slate justify-center mt-8'>
        <span>Chord data is from</span>
        <ALink href='https://github.com/tombatossals/chords-db'>chords-db</ALink>
        <span>.</span>
      </div>
    </>
  )
}
