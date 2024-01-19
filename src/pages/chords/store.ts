import { create } from '@/utils'

import type { ChordKey } from '@/utils'

export const store = create({
  key: 'C' as ChordKey,

  showAllSuffixes: false,
})
