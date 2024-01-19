import { useEffect } from 'react'

import type { AnyFunc } from '@/utils'

export const useMount = (fn?: AnyFunc) => useEffect(() => void fn?.(), [])
