import cn from 'classnames'
import { Button } from '@geist-ui/core'
import { PitchDetector } from 'pitchy'
import { useTranslation } from 'react-i18next'

import { store } from './store'
import { useRender } from '@/hooks/use-render'
import { useUnmount } from '@/hooks/use-unmount'
import { findClosestPitch } from './pitch'
import { useViewTransition } from '@/hooks/use-view-transition'

const STANDARD_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']

// global timer, fix the bug of not clearing `setInterval` when change route
let timer: number = 0

export function Tuner() {
  const state = store.useState()

  const { t } = useTranslation(['common', 'nav', 'tuner'])
  const { render } = useRender()
  const { withTrans } = useViewTransition()

  const stopTuning = (stream?: MediaStream) => {
    if (timer) {
      clearInterval(timer)
      timer = 0
      render()
    }

    stream?.getTracks().forEach(track => track.stop())
  }

  useUnmount(stopTuning)

  async function starTuning() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const audioContext = new AudioContext()
    const analyserNode = audioContext.createAnalyser()

    store.mutate.stream = stream

    audioContext.createMediaStreamSource(stream).connect(analyserNode)
    const detector = PitchDetector.forFloat32Array(analyserNode.fftSize)
    detector.minVolumeDecibels = state.minVolumeDecibels
    const input = new Float32Array(detector.inputLength)

    timer = setInterval(updatePitch, state.interval)

    function updatePitch() {
      console.log('updatePitch...')
      analyserNode.getFloatTimeDomainData(input)

      const [pitch, clarity] = detector.findPitch(input, audioContext.sampleRate)
      if (!pitch || clarity <= state.minClarity) return

      store.mutate.clarity = clarity
      store.mutate.pitch = pitch
    }
  }

  const { hz, note, status, advice } = findClosestPitch(state.pitch)

  const adviceColor = {
    ok: 'text-lime',
    low: 'text-amber',
    high: 'text-red',
  }[status]

  return (
    <div>
      <h2>{t('nav:tuner')}</h2>
      <div className='flex flex-col items-center gap-2'>
        {timer ? (
          <>
            <span className='text-[128px]'>{timer ? note : '-'}</span>
            <span className='text-[36px]'>
              {state.pitch.toFixed(1)} Hz
              <span className='opacity-50'> / {hz} Hz</span>
            </span>
            <span className={cn('text-[48px]', adviceColor)}>{t(`tuner:${advice}`)}</span>
            <div className='text-center mb-8'>
              <span className={cn('opacity-50')}>{t('tuner:standard-tuning')}</span>
              <div className='flex items-center gap-4 relative'>
                {STANDARD_TUNING.map(tuning => {
                  const color = tuning === note ? `opacity-100 ${adviceColor}` : 'opacity-50'
                  const clsName = cn('text-4 lg:text-8 mx-2 transition-all font-medium', color)

                  return (
                    <div key={tuning} className={clsName}>
                      {tuning}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <span className='text-[24px] my-20vh'>{t('tuner:start-tip')}</span>
        )}

        <Button
          auto
          onClick={withTrans(() => (timer ? stopTuning(state.stream) : starTuning()))}
          placeholder={timer ? t('common:stop') : t('common:start')}
        >
          {timer ? t('common:stop') : t('common:start')}
        </Button>
      </div>
    </div>
  )
}
