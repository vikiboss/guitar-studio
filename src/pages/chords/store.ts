import { create } from '@/utils/create-store'

import type { ChordKey } from '@/utils/chords'

export const store = create({
  key: 'C' as ChordKey,

  showAllSuffixes: false,
})
