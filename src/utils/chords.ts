import data from '@/utils/chords.json'

import type { ArrayItem } from './types'

export type ChordData = typeof data
export type Chords = ChordData['chords']
export type Note = keyof Chords
export type Suffix = ArrayItem<Chords[Note]>['suffix']

export type Chord = {
  key: string
  suffix: 'major'
  positions: Position[]
}

export type Position = {
  frets: number[]
  fingers: number[]
  barres: number[]
  baseFret: number
  midi: number[]
  capo?: boolean
}

export const main = data.main as ChordData['main']
export const chords = data.chords as ChordData['chords']
export const keys = data.keys as ChordData['keys']
export const suffixes = data.suffixes as ChordData['suffixes']
export const tunings = data.tunings as ChordData['tunings']
