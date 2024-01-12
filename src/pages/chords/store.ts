import { create } from '@/utils/create-store'

import type { Note, Suffix } from '@/utils/chords'

export const store = create({
  note: 'C' as Note,
  suffix: 'major' as Suffix,
})
