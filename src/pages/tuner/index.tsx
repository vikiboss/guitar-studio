import { PitchDetector } from 'pitchy'
import { useTranslation } from 'react-i18next'

import { store } from './store'
import { Button } from '@geist-ui/core'

export function Tuner() {
  const state = store.useState()
  const { t } = useTranslation(['nav'])

  async function starTuning() {
    const audioContext = new AudioContext()
    const analyserNode = audioContext.createAnalyser()

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    audioContext.createMediaStreamSource(stream).connect(analyserNode)
    const detector = PitchDetector.forFloat32Array(analyserNode.fftSize)
    detector.minVolumeDecibels = -10
    const input = new Float32Array(detector.inputLength)

    setInterval(updatePitch, 100)

    function updatePitch() {
      console.log('updatePitch...')

      analyserNode.getFloatTimeDomainData(input)

      const [pitch, clarity] = detector.findPitch(input, audioContext.sampleRate)

      if (!pitch) return

      store.mutate.clarity = clarity
      store.mutate.pitch = pitch
    }
  }

  return (
    <div>
      <h2>{t('tuner')}</h2>

      <div className='flex gap-4'>
        <span>pitch: {state.pitch.toFixed(3)}Hz</span>
        <span>clarity: {(state.clarity * 100).toFixed(3)}%</span>
      </div>

      <Button auto onClick={starTuning} placeholder='start'>
        start
      </Button>
    </div>
  )
}
