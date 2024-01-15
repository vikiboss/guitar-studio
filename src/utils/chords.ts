import data from '@/utils/chords.json'

export const chordsDb = {
  main: data.main as Main,
  chords: data.chords as Record<ChordKey, Chord[]>,
  keys: data.keys as ChordShortKey[],
  suffixes: data.suffixes as ChordSuffix[],
  tunings: data.tunings as Tunings,
}

export const CommonSuffixes = ['major', 'minor', '7', 'maj7', 'm7', 'sus4'] as ChordSuffix[]

export type Chord = {
  key: ChordShortKey
  suffix: ChordSuffix
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

export type Main = {
  strings: number
  fretsOnChord: number
  name: string
  numberOfChords: number
}

export type Tunings = {
  standard: string[]
}

export type ChordKey =
  | 'C'
  | 'Csharp'
  | 'D'
  | 'Eb'
  | 'E'
  | 'F'
  | 'Fsharp'
  | 'G'
  | 'Ab'
  | 'A'
  | 'Bb'
  | 'B'

export type ChordShortKey = Exclude<ChordKey, 'Csharp' | 'Fsharp'> | 'C#' | 'F#'

export type ChordSuffix =
  | 'major'
  | 'minor'
  | '7'
  | 'maj7'
  | 'm7'
  | 'sus4'
  | 'sus2'
  | '9'
  | 'm9'
  | 'maj9'
  | '6'
  | 'm6'
  | 'dim'
  | 'dim7'
  | 'aug'
  | '7b5'
  | '7#9'
  | '7sus4'
  | '11'
  | '13'
  | 'add9'
  | 'madd9'
  | '5'
  | '69'
  | '9b5'
  | 'aug9'
  | '7b9'
  | '9#11'
  | 'maj7b5'
  | 'maj7#5'
  | 'maj11'
  | 'maj13'
  | 'm7b5'
  | 'm69'
  | 'm11'
  | 'mmaj7'
  | 'mmaj7b5'
  | 'mmaj9'
  | 'mmaj11'
  | 'sus2sus4'
  | '7/G'
  | 'aug7'
  | 'alt'
  | '/E'
  | '/F'
  | '/G'

export const getChordName = (chord: Chord) => {
  const keyName = chord.key.replace('#', '♯').replace('b', '♭')
  const suffixName = chord.suffix.replace('#', '♯').replace('b', '♭')

  if (suffixName === 'major') return keyName
  if (suffixName === 'minor') return `${keyName}m`
  if (suffixName === 'dim') return `${keyName}°`
  if (suffixName === 'dim7') return `${keyName}°7`
  if (suffixName === 'aug') return `${keyName}+`
  if (suffixName === 'aug7') return `${keyName}+7`

  return `${keyName}${suffixName}`
}
