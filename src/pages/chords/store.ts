import { chords } from '@/utils/chords'
import { create } from '@/utils/create-store'
import { ArrayItem } from '@/utils/types'

export type Chord = typeof chords
export type Note = keyof Chord
export type Suffix = ArrayItem<Chord[Note]>['suffix']

export const store = create({
  note: 'C' as Note,
  suffix: 'major' as Suffix,
})
