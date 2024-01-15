import cn from 'classnames'
import { draw } from 'vexchords'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Checkbox, Select, Tabs, useTabs } from '@geist-ui/core'

import { store } from './store'
import { ALink } from '@/components/a-link'
import { CommonSuffixes, chordsDb, getChordName } from '@/utils/chords'
import { useTheme } from '@/hooks/use-theme'

import type { Chord, ChordKey, ChordSuffix } from '@/utils/chords'

const getStyle = (isLg: boolean, isDark: boolean) => ({
  width: isLg ? 160 : 160,
  height: isLg ? 220 : 220,
  fontSize: isLg ? '16' : '16',
  fontWeight: 'medium',
  textColor: isDark ? '#ffffff80' : '#00000080',
  labelColor: isDark ? '#000000' : '#ffffff',
  strokeColor: isDark ? '#cccccc' : '#333333',
})

export function Chords() {
  const { t } = useTranslation(['nav'])
  const { key, showAllSuffixes } = store.useState()
  const isLg = useMediaQuery('lg')
  const { isDark } = useTheme()

  const chords = chordsDb.chords[key.replace('#', 'sharp') as ChordKey]

  const renderChords = showAllSuffixes
    ? chords
    : chords.filter(e => CommonSuffixes.includes(e.suffix))

  const getDomId = (chord: Chord) => {
    const _key = chord.key.replace('#', '_up_')
    const _suffix = chord.suffix.replace('#', '_up_').replace('/', '_slash_')
    return _key + _suffix
  }

  useEffect(() => {
    renderChords.forEach(e => {
      const p = e.positions[0]
      const domId = getDomId(e)

      const el = document.getElementById(domId)

      if (el) {
        el.innerHTML = ''

        const chord = p.frets.map((it, idx) => [
          6 - idx,
          it === -1 ? 'x' : it,
          p.fingers[idx] || '',
        ])

        console.log('domId', domId, 'chord', chord)
        try {
          draw(`#${domId}`, { chord }, getStyle(isLg, isDark))
        } catch (e) {
          console.error(e)
        }
      }
    })
  }, [renderChords, isLg, isDark])

  return (
    <>
      <div className={cn('flex gap-4 mt-4 flex-wrap', isLg ? '' : 'justify-center')}>
        <Tabs
          value={key}
          className='max-w-[92vw] lg:w-[880px]!'
          onChange={e => (store.mutate.key = e as ChordKey)}
        >
          {chordsDb.keys.map(key => (
            <Tabs.Item key={key} label={key} value={key}>
              <div className='flex flex-col'>
                <div className='flex justify-end'>
                  <Checkbox
                    initialChecked={showAllSuffixes}
                    checked={showAllSuffixes}
                    onChange={e => (store.mutate.showAllSuffixes = e.target.checked)}
                  >
                    Show All Chords
                  </Checkbox>
                </div>
                <div>
                  <div className='grid grid-cols-4 gap-2 mt-4'>
                    {renderChords.map(chord => (
                      <div className='flex flex-col gap-2 items-center'>
                        <div
                          id={getDomId(chord)}
                          key={chord.positions[0].fingers.join('_')}
                          className={cn(
                            'flex items-center justify-center',
                            isLg ? 'col-span-1' : 'col-span-2',
                          )}
                        />
                        <span>{getChordName(chord)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tabs.Item>
          ))}
        </Tabs>
      </div>

      <div className='flex gap-1 text-slate justify-center mt-8'>
        <span>Chord data is from</span>
        <ALink href='https://github.com/tombatossals/chords-db'>chords-db</ALink>
        <span>.</span>
      </div>
    </>
  )
}
