import cn from 'classnames'
import { Button } from '@geist-ui/core'
import { useState } from 'react'
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
  const { t } = useTranslation(['nav'])
  const state = store.useState()
  const render = useRender()
  const { withTransition } = useViewTransition()
  const [stream, setStream] = useState<MediaStream>()

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
    const audioContext = new AudioContext()
    const analyserNode = audioContext.createAnalyser()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    setStream(stream)

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
      <h2>{t('tuner')}</h2>
      <div className='flex flex-col items-center gap-2'>
        {timer ? (
          <>
            <span className='text-[128px]'>{timer ? note : '-'}</span>
            <span className='text-[36px]'>
              {state.pitch.toFixed(1)} Hz
              <span className='opacity-50'> / {hz} Hz</span>
            </span>
            <span className={cn('text-[48px]', adviceColor)}>{advice}</span>
            <div className='text-center mb-8'>
              <span className={cn('text-4, opacity-50')}>{t('standard-tuning')}</span>
              <div className='flex items-center gap-4 relative'>
                {STANDARD_TUNING.map(tuning => {
                  const color = tuning === note ? adviceColor : 'text-white'
                  const clsName = cn('text-8 mx-2 transition-all font-medium', color)

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
          <span className='text-[36px] my-20vh'>
            Press <code>start</code> button below to tuning!
          </span>
        )}

        <Button
          auto
          onClick={withTransition(() => (timer ? stopTuning(stream) : starTuning()))}
          placeholder={timer ? 'stop' : 'start'}
        >
          {timer ? 'stop' : 'start'}
        </Button>
      </div>
    </div>
  )
}
