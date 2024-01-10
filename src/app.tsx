import { useState } from 'react'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen grid place-content-center'>
      <div>
        <h1 className='text-amber'>React + TS + Vite + UnoCSS</h1>
        <p>Happy coding!</p>
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
      </div>
    </div>
  )
}
