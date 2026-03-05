let _audioContext: AudioContext | null = null
let _beatSounds: { regular: AudioBuffer; accent: AudioBuffer } | null = null

const createSound = (frequency: number, amplitude: number, ctx: AudioContext): AudioBuffer => {
  const { sampleRate } = ctx
  const bufferLength = Math.floor(sampleRate * 0.1)
  const buffer = ctx.createBuffer(1, bufferLength, sampleRate)
  const data = buffer.getChannelData(0)

  const angularFreq = ((2 * Math.PI) / sampleRate) * frequency
  const decayRates = [100, 200, 500].map(r => r / sampleRate)
  const amps = [0.09, 0.34, 0.57]

  for (let i = 0; i < bufferLength; i++) {
    data[i] =
      amplitude *
      decayRates.reduce(
        (sum, decay, idx) =>
          sum + amps[idx] * Math.exp(-i * decay) * Math.sin((idx + 1) * angularFreq * i),
        0,
      )
  }

  return buffer
}

export const getAudioContext = (): AudioContext => {
  if (!_audioContext) _audioContext = new AudioContext()
  return _audioContext
}

export const getBeatSounds = () => {
  const ctx = getAudioContext()
  if (!_beatSounds) {
    _beatSounds = {
      regular: createSound(440, 0.7, ctx),
      accent: createSound(880, 0.9, ctx),
    }
  }
  return _beatSounds
}
