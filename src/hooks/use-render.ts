import { useState } from 'react'

export const useRender = () => {
  const [_, forceUpdate] = useState(0)
  return () => forceUpdate(x => x + 1)
}
