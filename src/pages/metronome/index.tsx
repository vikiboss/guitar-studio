import RangeSlider from '@/components/range-slider'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'

import { store } from './store'
import { usePrevious } from '@/hooks/use-previous'
import { useMediaQuery } from '@geist-ui/core'
import classNames from 'classnames'

export function Metronome() {
  const state = store.useState()
  const isLg = useMediaQuery('lg')
  const { t } = useTranslation(['nav'])
  const preValue = usePrevious(state.bmp)

  return (
    <div>
      <div className={classNames('flex flex-col gap-12 items-center', isLg ? 'w-880px' : 'w-92vw')}>
        <div className='bg-lime-3/80 dark:bg-lime-7/80 px-3 py-1 rounded'>🏗 under development</div>

        <div className='flex items-center flex-col'>
          <CountUp className='text-24' start={preValue} end={state.bmp} duration={0.1} />
          <span className='tracking-wide bg-slate-2 dark:bg-slate-6 px-3 py-1 rounded text-center'>
            BMP
          </span>
        </div>

        <div className='flex items-center justify-between gap-4'>
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
