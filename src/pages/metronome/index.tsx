import CountUp from 'react-countup'
import { toast } from 'sonner'
import { useMediaQuery } from '@geist-ui/core'
import { useTranslation } from 'react-i18next'

import { cn } from '@/utils'
import { store } from './store'
import { usePrevious } from '@/hooks'

export function Metronome() {
  const state = store.useState()
  const isLg = useMediaQuery('lg')
  const { t } = useTranslation(['nav'])
  const preValue = usePrevious(state.bmp)

  return (
    <div>
      <div className={cn('flex-col-center gap-12', isLg ? 'w-880px' : 'w-92vw')}>
        <div className='bg-zinc-2/80 dark:bg-zinc-8/80 shadow px-3 py-1 rounded'>
          <span className='border-0 border-r border-solid border-zinc/40 mr-2 pr-2'>🏗</span>It's
          still under development
        </div>

        <div className='flex-col-center'>
          <CountUp
            className='font-medium text-24 font-mono tracking-wide'
            start={preValue}
            end={state.bmp}
            duration={0.1}
          />
          <span className='tracking-wide bg-zinc-2/80 dark:bg-zinc-6 px-3 py-1 rounded text-center'>
            BPM
          </span>
        </div>

        <div className='flex-between gap-4'>
          <div
            onClick={() => store.mutate.bmp > 1 && (store.mutate.bmp -= 1)}
            className='select-none w-8 h-8 text-center text-xl rounded-2 hover:cursor-pointer hover:bg-zinc-2 dark:bg-zinc-6 bg-zinc-1 dark:hover:bg-zinc-5 hover:bg-zinc-1'
          >
            -
          </div>
          <input
            type='range'
            onChange={e => (store.mutate.bmp = +e.target.value)}
            max={240}
            min={1}
            step={1}
            className={cn('h-48px', isLg ? 'w-800px' : 'w-60vw')}
            list='bpm-value'
            value={state.bmp}
          />
          <datalist id='bpm-value'>
            <option value='20'></option>
            <option value='40'></option>
            <option value='60'></option>
            <option value='80'></option>
            <option value='100'></option>
            <option value='120'></option>
            <option value='140'></option>
            <option value='160'></option>
            <option value='180'></option>
            <option value='200'></option>
            <option value='220'></option>
          </datalist>
          <div
            onClick={() => store.mutate.bmp < 240 && (store.mutate.bmp += 1)}
            className='select-none w-8 h-8 text-center text-xl rounded-2 hover:cursor-pointer hover:bg-zinc-2 dark:bg-zinc-6 bg-zinc-1 dark:hover:bg-zinc-5 hover:bg-zinc-1'
          >
            +
          </div>
        </div>

        <div className='flex gap-2 items-center'>
          <div
            onClick={() => toast('work in progress')}
            className='select-none flex gap-1 items-center py-2 px-4 rounded-2 bg-zinc-1 hover:bg-zinc-2 hover:cursor-pointer hover:bg-zinc-2 dark:bg-zinc-6 bg-zinc-1 dark:hover:bg-zinc-5 hover:bg-zinc-1'
          >
            <div className='i-mdi-play' />
            Start
          </div>
          <div
            onClick={() => toast('work in progress')}
            className='select-none flex gap-1 items-center  py-2 px-4 rounded-2 bg-zinc-1 hover:bg-zinc-2 hover:cursor-pointer hover:bg-zinc-2 dark:bg-zinc-6 bg-zinc-1 dark:hover:bg-zinc-5 hover:bg-zinc-1'
          >
            <div className='i-mdi-gesture-tap-hold' />
            Tap BPM
          </div>
        </div>
      </div>
    </div>
  )
}
