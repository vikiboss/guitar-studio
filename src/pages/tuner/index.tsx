import cn from 'classnames'
import { Button } from '@geist-ui/core'
import { useState } from 'react'
import { PitchDetector } from 'pitchy'
import { useTranslation } from 'react-i18next'

import { store } from './store'
import { findClosestPitch } from './pitch'

export function Tuner() {
  const { t } = useTranslation(['nav'])
  const state = store.useState()
  const [timer, setTimer] = useState<number>()
  const [stream, setStream] = useState<MediaStream | null>(null)

  async function starTuning() {
    const audioContext = new AudioContext()
    const analyserNode = audioContext.createAnalyser()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    setStream(stream)

    audioContext.createMediaStreamSource(stream).connect(analyserNode)
    const detector = PitchDetector.forFloat32Array(analyserNode.fftSize)
    detector.minVolumeDecibels = -30

    const input = new Float32Array(detector.inputLength)

    setTimer(setInterval(updatePitch, 50))

    function updatePitch() {
      console.log('updatePitch...')

      analyserNode.getFloatTimeDomainData(input)

      const [pitch, clarity] = detector.findPitch(input, audioContext.sampleRate)

      if (!pitch || clarity <= 0.9) return

      store.mutate.clarity = clarity
      store.mutate.pitch = pitch
    }
  }

  const { hz, note, advice } = findClosestPitch(state.pitch)

  return (
    <div>
      <h2>{t('tuner')}</h2>

      <div className='flex flex-col items-center gap-2'>
        {timer ? (
          <>
            <span className='text-[168px]'>{timer ? note : '-'}</span>
            <span className='text-[36px]'>
              {state.pitch.toFixed(1)} Hz
              <span className='text-[24px] text-slate dark:text-gray'> / {hz} Hz</span>
            </span>
            <span
              className={cn(
                'text-[68px]',
                advice === 'Tune Up' ? 'text-amber' : advice === 'Nice' ? 'text-lime' : 'text-red',
              )}
            >
              {advice}
            </span>
          </>
        ) : (
          <span className='text-[36px] my-20vh'>Press start to start tuning!</span>
        )}

        <Button
          auto
          onClick={() => {
            if (timer) {
              clearInterval(timer)
              setTimer(undefined)
              stream?.getTracks().forEach(track => track.stop())
            } else {
              starTuning()
            }
          }}
          placeholder={timer ? 'stop' : 'start'}
        >
          {timer ? 'stop' : 'start'}
        </Button>
      </div>
    </div>
  )
}
