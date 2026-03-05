import { create } from '@/utils'

export const store = create({
  bpm: 120,
  isPlaying: false,
  currentBeat: -1,
  beatsPerMeasure: 4,
})
