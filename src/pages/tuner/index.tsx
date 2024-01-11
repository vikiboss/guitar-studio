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
  const [timer, setTimer] = useState<number>(0)
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
        <Button
          auto
          onClick={() => {
            if (timer) {
              clearInterval(timer)
              stream?.getTracks().forEach(track => track.stop())
            } else {
              starTuning()
            }
          }}
          placeholder={timer ? 'stop' : 'start'}
        >
          {timer ? 'stop' : 'start'}
        </Button>

        <span className='text-[168px]'>{note}</span>
        <span className='text-[36px]'>{state.pitch.toFixed(1)} Hz / {hz} Hz</span>
        <span
          className={cn(
            'text-[68px]',
            advice === 'Tune Up' ? 'text-amber' : advice === 'nice' ? 'text-lime' : 'text-red',
          )}
        >
          {advice}
        </span>
      </div>
    </div>
  )
}
