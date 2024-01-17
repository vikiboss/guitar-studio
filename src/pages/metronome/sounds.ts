const audioContextInstance = new window.AudioContext()

const createMetronomeSound = (
  frequency: number = 440,
  amplitude: number = 0.7,
  sampleRate: number = 44100,
  audioContext: AudioContext = audioContextInstance,
): AudioBuffer => {
  const bufferLength = sampleRate * 0.1
  const soundBuffer = audioContext.createBuffer(1, bufferLength, sampleRate)
  const bufferData = soundBuffer.getChannelData(0)

  const angularFrequency = ((2 * Math.PI) / sampleRate) * frequency
  const decayRates = [100, 200, 500].map(rate => rate / sampleRate)
  const amplitudes = [0.09, 0.34, 0.57]

  const calculateComponent = (
    decayRate: number,
    amplitude: number,
    frequencyMultiplier: number,
    index: number,
  ): number => {
    const decayFactor = Math.exp(-index * decayRate)
    const sineComponent = Math.sin(frequencyMultiplier * angularFrequency * index)
    return amplitude * decayFactor * sineComponent
  }

  for (let i = 0; i < bufferLength; i++) {
    const component = decayRates.reduce((accumulator, decayRate, idx) => {
      return accumulator + calculateComponent(decayRate, amplitudes[idx], idx + 1, i)
    }, 0)

    bufferData[i] = amplitude * component
  }

  return soundBuffer
}

export const BeatSound = {
  regular: createMetronomeSound(440, 0.7),
  accent: createMetronomeSound(880, 0.9),
  subdivision: createMetronomeSound(520, 0.3),
}
