import { createBrowserRouter } from 'react-router-dom'

import { App } from './app'
import { Home } from './pages/home'
import { About } from './pages/about'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])
