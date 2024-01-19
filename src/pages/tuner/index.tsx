import cn from 'classnames'
import { Button } from '@geist-ui/core'
import { PitchDetector } from 'pitchy'
import { useTranslation } from 'react-i18next'

import { store } from './store'
import { chordsDb } from '@/utils/chords'
import { useRender } from '@/hooks/use-render'
import { useUnmount } from '@/hooks/use-unmount'
import { findClosestPitch } from './pitch'
import { useViewTransition } from '@/hooks/use-view-transition'

// global timer to fix the bug of setInterval when switching pages
let timer: number = 0

const ns = ['common', 'nav', 'tuner'] as const

export function Tuner() {
  const state = store.useState()

  const { t } = useTranslation(ns)
  const { render } = useRender()
  const { withTrans } = useViewTransition()

  const setTimer = (t: number) => ((timer = t), render())

  const stopTuning = () => {
    timer && (clearInterval(timer), setTimer(0))
    store.mutate.stream.value?.getTracks().forEach(track => track.stop())
  }

  useUnmount(stopTuning)

  async function starTuning() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const audioContext = new AudioContext()
    const analyserNode = audioContext.createAnalyser()

    audioContext.createMediaStreamSource(stream).connect(analyserNode)
    const detector = PitchDetector.forFloat32Array(analyserNode.fftSize)
    detector.minVolumeDecibels = state.minVolumeDecibels
    const input = new Float32Array(detector.inputLength)

    store.mutate.stream.value = stream

    function updatePitch() {
      console.log('updatePitch...')
      analyserNode.getFloatTimeDomainData(input)

      const [pitch, clarity] = detector.findPitch(input, audioContext.sampleRate)

      if (pitch && clarity >= state.minClarity) {
        store.mutate.clarity = clarity
        store.mutate.pitch = pitch
      }
    }

    setTimer(setInterval(updatePitch, state.interval))
  }

  const { closest, status, advice } = findClosestPitch(state.pitch)
  const adviceColor = { ok: 'text-lime', low: 'text-amber', high: 'text-red' }[status]

  return (
    <div>
      <div className='flex-col-center gap-2'>
        {timer ? (
          <>
            <span className='text-24 lg:text-28'>{timer ? closest.note : '-'}</span>
            <span className='text-4 lg:text-6'>
              {state.pitch.toFixed(1)} Hz
              <span className='opacity-50'> / {closest.frequency} Hz</span>
            </span>
            <span className={cn('text-10 lg:text-12', adviceColor)}>{t(`tuner:${advice}`)}</span>
            <div className='text-center mb-8'>
              <span className={cn('opacity-50')}>{t('tuner:standard-tuning')}</span>
              <div className='flex-center gap-4 relative'>
                {chordsDb.tunings.standard.map(tuning => {
                  const color =
                    tuning === closest.note ? `opacity-100 ${adviceColor}` : 'opacity-50'
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
          <span className='text-3 lg:text-6 my-20vh'>{t('tuner:start-tip')}</span>
        )}

        <Button
          auto
          onClick={withTrans(timer ? stopTuning : starTuning)}
          placeholder={timer ? t('common:stop') : t('common:start')}
        >
          {timer ? t('common:stop') : t('common:start')}
        </Button>
      </div>
    </div>
  )
}
