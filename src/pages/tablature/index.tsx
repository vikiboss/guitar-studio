import { useState } from 'react'
import { useMediaQuery } from '@geist-ui/core'
import { useTranslation } from 'react-i18next'

import { cn } from '@/utils'

const STRING_COLOR: Record<string, string> = {
  e: 'text-red-5 dark:text-red-4',
  B: 'text-orange-5 dark:text-orange-4',
  G: 'text-yellow-6 dark:text-yellow-4',
  D: 'text-green-6 dark:text-green-4',
  A: 'text-blue-5 dark:text-blue-4',
  E: 'text-purple-5 dark:text-purple-4',
}

const EXAMPLES: { title: string; tab: string }[] = [
  {
    title: 'E Minor Pentatonic Scale',
    tab: `e|-12-15-|
B|-12-15-|
G|-12-14-|
D|-12-14-|
A|-12-14-|
E|-12-15-|`,
  },
  {
    title: 'Smoke on the Water',
    tab: `e|--------------------------------|
B|--------------------------------|
G|-0-3-5-0-3-6-5-0-3-5-3---------|
D|-0-3-5-0-3-6-5-0-3-5-3---------|
A|--------------------------------|
E|--------------------------------|`,
  },
  {
    title: 'Nothing Else Matters (Intro)',
    tab: `e|-0-0-0-0-0-0-|
B|-0-0-0-0-0-0-|
G|-9-9-9-9-9-9-|
D|-9-9-9-9-9-9-|
A|-7-7-7-7-7-7-|
E|-------------|`,
  },
]

function renderTab(text: string) {
  return text.split('\n').map((line, i) => {
    const match = line.match(/^([eEADGB])\|/)
    const colorClass = match ? (STRING_COLOR[match[1]] ?? '') : 'opacity-70'
    return (
      <div key={i} className={cn('font-mono whitespace-pre leading-6', colorClass)}>
        {line || '\u00A0'}
      </div>
    )
  })
}

export function Tablature() {
  const isLg = useMediaQuery('lg')
  const { t } = useTranslation(['tablature'])
  const [text, setText] = useState(EXAMPLES[0].tab)
  const [activeExample, setActiveExample] = useState(0)

  const loadExample = (idx: number) => {
    setActiveExample(idx)
    setText(EXAMPLES[idx].tab)
  }

  return (
    <div className={cn('flex-col-center gap-8', isLg ? 'w-880px' : 'w-92vw')}>
      {/* Example tabs */}
      <div className='w-full'>
        <p className='text-xs opacity-50 mb-2'>{t('tablature:examples')}</p>
        <div className='flex flex-wrap gap-2'>
          {EXAMPLES.map((ex, i) => (
            <div
              key={i}
              onClick={() => loadExample(i)}
              className={cn(
                'select-none text-sm py-1 px-3 rounded-2 hover:cursor-pointer transition-colors',
                activeExample === i
                  ? 'bg-zinc-7 text-white dark:bg-zinc-2 dark:text-black'
                  : 'bg-zinc-1 dark:bg-zinc-7 hover:bg-zinc-2 dark:hover:bg-zinc-6',
              )}
            >
              {ex.title}
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className='w-full grid gap-4' style={{ gridTemplateColumns: isLg ? '1fr 1fr' : '1fr' }}>
        <div>
          <p className='text-xs opacity-50 mb-2'>{t('tablature:input')}</p>
          <textarea
            value={text}
            onChange={e => {
              setText(e.target.value)
              setActiveExample(-1)
            }}
            spellCheck={false}
            className={cn(
              'w-full font-mono text-sm p-3 rounded-2 resize-none outline-none',
              'bg-zinc-1 dark:bg-zinc-8 border border-solid border-zinc-2 dark:border-zinc-7',
              'focus:border-zinc-4 dark:focus:border-zinc-5',
            )}
            rows={10}
            placeholder={`e|-0-2-3-|\nB|-0-1-3-|\nG|-0-2-0-|\nD|-2-2-0-|\nA|-2-0-2-|\nE|-0-----|\n`}
          />
        </div>

        {/* Rendered */}
        <div>
          <p className='text-xs opacity-50 mb-2'>{t('tablature:preview')}</p>
          <div
            className={cn(
              'p-3 rounded-2 min-h-[200px]',
              'bg-zinc-1 dark:bg-zinc-8 border border-solid border-zinc-2 dark:border-zinc-7',
            )}
          >
            {text ? renderTab(text) : <span className='opacity-30 text-sm'>{t('tablature:nothing-to-preview')}</span>}
          </div>
        </div>
      </div>

      {/* String legend */}
      <div className='flex gap-4 text-xs opacity-60'>
        {Object.entries(STRING_COLOR).map(([s, cls]) => (
          <span key={s} className={cls}>
            {s === 'E'
              ? t('tablature:string-low-e')
              : s === 'e'
                ? t('tablature:string-high-e')
                : s}
          </span>
        ))}
      </div>
    </div>
  )
}
