import { create } from '@/utils'

export const INTERVALS = [
  { semitones: 2, name: 'Major 2nd' },
  { semitones: 3, name: 'Minor 3rd' },
  { semitones: 4, name: 'Major 3rd' },
  { semitones: 5, name: 'Perfect 4th' },
  { semitones: 6, name: 'Tritone' },
  { semitones: 7, name: 'Perfect 5th' },
  { semitones: 9, name: 'Major 6th' },
  { semitones: 10, name: 'Minor 7th' },
  { semitones: 12, name: 'Octave' },
] as const

export type IntervalName = (typeof INTERVALS)[number]['name']

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function generateQuestion() {
  const correctIdx = Math.floor(Math.random() * INTERVALS.length)
  const others = shuffle(
    INTERVALS.map((_, i) => i).filter(i => i !== correctIdx),
  ).slice(0, 3)
  const choices = shuffle([correctIdx, ...others])
  // Root note in range E2–E4 (82–330 Hz), common guitar range
  const rootFreq = 82 * Math.pow(2, Math.random() * 2)
  return { correctIdx, choices, rootFreq }
}

const init = generateQuestion()

export const store = create({
  correctIdx: init.correctIdx,
  choices: init.choices as number[],
  rootFreq: init.rootFreq,
  answered: false,
  lastCorrect: false,
  correct: 0,
  total: 0,
})
