import { useRef } from 'react'

export const useLatest = <T>(value: T) => {
  const ref = useRef(value)
  return (ref.current = value), ref
}
