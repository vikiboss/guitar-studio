import { AnyFunc } from '@/utils/types'

// polyfill for startViewTransition
document.startViewTransition = document.startViewTransition
  ? document.startViewTransition
  : (fn: AnyFunc) => fn()

export const useViewTransition = () => {
  return {
    start: (fn: AnyFunc) => document.startViewTransition(fn) ?? fn(),
    withTrans: (fn: AnyFunc) => () => document.startViewTransition(fn) ?? fn(),
  } as const
}
