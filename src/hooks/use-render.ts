import { useState } from 'react'

export const useRender = () => {
  const [_, forceUpdate] = useState(0)
  return { render: () => forceUpdate(x => x + 1) } as const
}
