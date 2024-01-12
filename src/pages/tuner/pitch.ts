import { store } from './store'

class Pitch {
  note: string
  frequency: number

  constructor(note: string, frequency: number) {
    this.note = note
    this.frequency = frequency
  }
}

const Pitches: Pitch[] = [
  new Pitch('C0', 16.35),
  new Pitch('C#0', 17.32),
  new Pitch('D0', 18.35),
  new Pitch('D#0', 19.45),
  new Pitch('E0', 20.6),
  new Pitch('F0', 21.83),
  new Pitch('F#0', 23.12),
  new Pitch('G0', 24.5),
  new Pitch('G#0', 25.96),
  new Pitch('A0', 27.5),
  new Pitch('A#0', 29.14),
  new Pitch('B0', 30.87),
  new Pitch('C1', 32.7),
  new Pitch('C#1', 34.65),
  new Pitch('D1', 36.71),
  new Pitch('D#1', 38.89),
  new Pitch('E1', 41.2),
  new Pitch('F1', 43.65),
  new Pitch('F#1', 46.25),
  new Pitch('G1', 49.0),
  new Pitch('G#1', 51.91),
  new Pitch('A1', 55.0),
  new Pitch('A#1', 58.27),
  new Pitch('B1', 61.74),
  new Pitch('C2', 65.41),
  new Pitch('C#2', 69.3),
  new Pitch('D2', 73.42),
  new Pitch('D#2', 77.78),
  new Pitch('E2', 82.41),
  new Pitch('F2', 87.31),
  new Pitch('F#2', 92.5),
  new Pitch('G2', 98.0),
  new Pitch('G#2', 103.83),
  new Pitch('A2', 110.0),
  new Pitch('A#2', 116.54),
  new Pitch('B2', 123.47),
  new Pitch('C3', 130.81),
  new Pitch('C#3', 138.59),
  new Pitch('D3', 146.83),
  new Pitch('D#3', 155.56),
  new Pitch('E3', 164.81),
  new Pitch('F3', 174.61),
  new Pitch('F#3', 185.0),
  new Pitch('G3', 196.0),
  new Pitch('G#3', 207.65),
  new Pitch('A3', 220.0),
  new Pitch('A#3', 233.08),
  new Pitch('B3', 246.94),
  new Pitch('C4', 261.63),
  new Pitch('C#4', 277.18),
  new Pitch('D4', 293.66),
  new Pitch('D#4', 311.13),
  new Pitch('E4', 329.63),
  new Pitch('F4', 349.23),
  new Pitch('F#4', 369.99),
  new Pitch('G4', 392.0),
  new Pitch('G#4', 415.3),
  new Pitch('A4', 440.0),
  new Pitch('A#4', 466.16),
  new Pitch('B4', 493.88),
  new Pitch('C5', 523.25),
  new Pitch('C#5', 554.37),
  new Pitch('D5', 587.33),
  new Pitch('D#5', 622.25),
  new Pitch('E5', 659.25),
  new Pitch('F5', 698.46),
  new Pitch('F#5', 739.99),
  new Pitch('G5', 783.99),
  new Pitch('G#5', 830.61),
  new Pitch('A5', 880.0),
  new Pitch('A#5', 932.33),
  new Pitch('B5', 987.77),
  new Pitch('C6', 1046.5),
  new Pitch('C#6', 1108.73),
  new Pitch('D6', 1174.66),
  new Pitch('D#6', 1244.51),
  new Pitch('E6', 1318.51),
  new Pitch('F6', 1396.91),
  new Pitch('F#6', 1479.98),
  new Pitch('G6', 1567.98),
  new Pitch('G#6', 1661.22),
  new Pitch('A6', 1760.0),
  new Pitch('A#6', 1864.66),
  new Pitch('B6', 1975.53),
  new Pitch('C7', 2093.0),
  new Pitch('C#7', 2217.46),
  new Pitch('D7', 2349.32),
  new Pitch('D#7', 2489.02),
  new Pitch('E7', 2637.02),
  new Pitch('F7', 2793.83),
  new Pitch('F#7', 2959.96),
  new Pitch('G7', 3135.96),
  new Pitch('G#7', 3322.44),
  new Pitch('A7', 3520.0),
  new Pitch('A#7', 3729.31),
  new Pitch('B7', 3951.07),
  new Pitch('C8', 4186.01),
  new Pitch('C#8', 4434.92),
  new Pitch('D8', 4698.63),
  new Pitch('D#8', 4978.03),
  new Pitch('E8', 5274.04),
  new Pitch('F8', 5587.65),
  new Pitch('F#8', 5919.91),
  new Pitch('G8', 6271.93),
  new Pitch('G#8', 6644.88),
  new Pitch('A8', 7040.0),
  new Pitch('A#8', 7458.62),
  new Pitch('B8', 7902.13),
]

// TODO: add i18n
const AdviceMap = {
  ok: 'Nice',
  high: 'Tune Down',
  low: 'Turn Up',
}

export function findClosestPitch(hz: number) {
  const closestPitch = Pitches.reduce((closest, pitch) => {
    const closestDelta = Math.abs(closest.frequency - hz)
    const newDelta = Math.abs(pitch.frequency - hz)
    return newDelta < closestDelta ? pitch : closest
  }, Pitches[0])

  const delta = Math.abs(closestPitch.frequency - hz)
  const minDeltaPreset = store.mutate.minDelta
  const status = delta <= minDeltaPreset ? 'ok' : hz < closestPitch.frequency ? 'low' : 'high'

  return {
    status,
    hz: +closestPitch.frequency.toFixed(1),
    note: closestPitch.note,
    advice: AdviceMap[status],
  }
}
