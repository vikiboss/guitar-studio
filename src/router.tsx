import { createBrowserRouter } from 'react-router-dom'

import { App } from './app'
import { Home } from './pages/home'
import { Tuner } from './pages/tuner'
import { Chords } from './pages/chords'
import { Tablature } from './pages/tablature'
import { Metronome } from './pages/metronome'
import { EarTraining } from './pages/ear-training'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/tuner', element: <Tuner /> },
      { path: '/metronome', element: <Metronome /> },
      { path: '/chords', element: <Chords /> },
      { path: '/ear-training', element: <EarTraining /> },
      { path: '/tablature', element: <Tablature /> },
    ],
  },
])
