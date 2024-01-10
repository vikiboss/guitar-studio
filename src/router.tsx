import { createBrowserRouter } from 'react-router-dom'

import { App } from './app'
import { Home } from './pages/home'
import { About } from './pages/about'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    exact: true,
    children: [
      {
        path: '/',
        element: <Home />,
        exact: true,
      },
      {
        path: '/about',
        element: <About />,
        exact: true,
      },
    ],
  },
])
