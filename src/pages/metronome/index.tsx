import CountUp from 'react-countup'
import { useMediaQuery } from '@geist-ui/core'
import { useTranslation } from 'react-i18next'

import { cn } from '@/utils'
import { store } from './store'
import RangeSlider from '@/components/range-slider'
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
          <span className='border-0 border-r border-solid border-slate/40 mr-2 pr-2'>🏗</span>It's
          now under development
        </div>

        <div className='flex-col-center'>
          <CountUp className='text-24' start={preValue} end={state.bmp} duration={0.1} />
          <span className='tracking-wide bg-zinc-2 dark:bg-zinc-6 px-3 py-1 rounded text-center'>
            BPM
          </span>
        </div>

        <div className='flex-between gap-4'>
          <span className='text-8'>1</span>
          <RangeSlider
            value={state.bmp}
            onChange={bmp => (store.mutate.bmp = bmp)}
            min={1}
            max={240}
            step={1}
            sliderWidth={isLg ? '800px' : '60vw'}
            sliderHeight='12px'
            pointerHeight='24px'
            pointerWidth='24px'
            mousewheelDisabled
            animateOnClick='0.1s'
          />
          <span className='text-8'>240</span>
        </div>
      </div>
    </div>
  )
}
