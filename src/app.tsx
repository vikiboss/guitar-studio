import { Outlet } from 'react-router-dom'

import { NavBar } from './components/nav-bar/index.tsx'

export function App() {
  return (
    <div className='h-screen w-screen'>
      <NavBar />
      <div className='mt-16 flex justify-center px-4'>
        <div className='max-w-[1200px] w-full lg:w-[72vw]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
