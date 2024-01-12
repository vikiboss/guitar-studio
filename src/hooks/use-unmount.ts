import { useEffect } from 'react'

import type { AnyFunc } from '@/utils/types'

export const useUnmount = (fn?: AnyFunc) => useEffect(() => () => void fn?.(), [])
