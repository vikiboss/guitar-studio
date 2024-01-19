import { draw } from 'vexchords'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Checkbox, Tabs } from '@geist-ui/core'

import { cn } from '@/utils/class-name'
import { store } from './store'
import { Anchor } from '@/components/anchor'
import { useTheme, useMount } from '@/hooks'
import { CommonSuffixes, OrderedKeyList, chordsDb, getChordName } from '@/utils/chords'

import type { Chord, ChordKey } from '@/utils/chords'

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
  const isLg = useMediaQuery('lg')
  const { t } = useTranslation(['nav', 'chords'])
  const { isDark } = useTheme()

  const { key, showAllSuffixes } = store.useState()

  const idxKey = key.replace('#', 'sharp') as ChordKey
  const chords = [...chordsDb.chords[idxKey]]

  chords.sort((p, n) => {
    const p_idx = CommonSuffixes.indexOf(p.suffix)
    const n_idx = CommonSuffixes.indexOf(n.suffix)
    return p_idx === -1 ? 1 : n_idx === -1 ? -1 : p_idx - n_idx
  })

  const renderChords = showAllSuffixes
    ? chords
    : chords.filter(e => CommonSuffixes.includes(e.suffix))

  const getDomId = (chord: Chord) => {
    const _key = chord.key.replace('#', '_up_')
    const _suffix = chord.suffix.replace('#', '_up_').replace('/', '_slash_')
    return _key + _suffix
  }

  const render = () => {
    renderChords.forEach(e => {
      const domId = getDomId(e)

      const el = document.getElementById(domId)
      if (!el) return

      el.innerHTML = ''

      const p = e.positions[0]
      const chord = p.frets.map((it, idx) => [6 - idx, it === -1 ? 'x' : it, p.fingers[idx] ?? ''])

      draw(`#${domId}`, { chord }, getStyle(isLg, isDark))
    })
  }

  useMount(() => setTimeout(render, 100))
  useEffect(() => void render(), [renderChords, isLg, isDark])

  return (
    <div className={cn('transition-all')}>
      <div className={cn('mt-4 flex flex-wrap gap-4', isLg ? '' : 'justify-center')}>
        <Tabs
          value={key}
          className='max-w-[92vw] lg:w-[880px]!'
          onChange={e => (store.mutate.key = e as ChordKey)}
        >
          {OrderedKeyList.map(orderedKey => (
            <Tabs.Item key={orderedKey} label={orderedKey} value={orderedKey}>
              <div className='flex flex-col'>
                <div className='flex-between px-2'>
                  <div>{t('chords:show-chords-total', { key, total: renderChords.length })}</div>
                  <Checkbox
                    initialChecked={showAllSuffixes}
                    checked={showAllSuffixes}
                    onChange={e => (store.mutate.showAllSuffixes = e.target.checked)}
                  >
                    {t('chords:show-all-chords')}
                  </Checkbox>
                </div>
                <div>
                  <div className='grid grid-cols-4 mt-4'>
                    {chords.map(chord => {
                      const isShow = showAllSuffixes || CommonSuffixes.includes(chord.suffix)

                      return (
                        <div
                          key={chord.key + chord.suffix}
                          className={cn(
                            isLg ? 'col-span-1' : 'col-span-2',
                            isShow ? 'flex-col-center gap-2' : 'hidden',
                          )}
                        >
                          <div
                            id={getDomId(chord)}
                            key={chord.positions[0].fingers.join('_')}
                            className={cn('flex-center')}
                          />
                          <span>{getChordName(chord)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Tabs.Item>
          ))}
        </Tabs>
      </div>

      <div className='flex-center text-slate/80 my-8'>
        Chords data are from&nbsp;
        <Anchor href='https://github.com/tombatossals/chords-db'>`chords-db`</Anchor>
        <span>.</span>
      </div>
    </div>
  )
}
