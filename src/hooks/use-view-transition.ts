import { AnyFunc } from '@/utils/types'

export const useViewTransition = () => {
  return {
    start: (fn: AnyFunc) => document.startViewTransition(fn),
    withTrans: (fn: AnyFunc) => () => document.startViewTransition(fn),
  } as const
}
