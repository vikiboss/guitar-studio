import { proxy, useSnapshot } from 'valtio'

export const create = <T extends object>(initialState: T) => {
  const state = proxy(initialState)

  return {
    mutate: state,
    restore: () => Object.assign(state, structuredClone(initialState)),
    useState: () => useSnapshot(state),
  }
}
