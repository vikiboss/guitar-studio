import { useEffect } from 'react'

export type AnyFn = (...args: unknown[]) => void | Promise<void>

export const useMount = (fn?: AnyFn) => useEffect(() => void fn?.(), [])
