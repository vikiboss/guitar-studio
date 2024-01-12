import { useEffect } from 'react'

import { useLatest } from './use-latest'

import type { AnyFunc } from '@/utils/types'

export const useUnmount = (fn?: AnyFunc) => {
  const fnRef = useLatest(fn)
  useEffect(() => () => void fnRef.current?.(), [])
}
