import { AnyFunc } from '@/utils/types'

export const useViewTransition = () => {
  return {
    startTransition: (fn: AnyFunc) => document.startViewTransition(fn),
    withTransition: (fn: AnyFunc) => () => document.startViewTransition(fn),
  }
}
