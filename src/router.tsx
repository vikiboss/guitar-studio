import { createBrowserRouter } from 'react-router-dom'

import { App } from './app'
import { Home } from './pages/home'
import { Tuner } from './pages/tuner'
import { Chords } from './pages/chords'
import { Tablature } from './pages/tablature'
import { Metronome } from './pages/metronome'
import { PitchTraining } from './pages/pitch-training'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/tuner', element: <Tuner /> },
      { path: '/metronome', element: <Metronome /> },
      { path: '/chords', element: <Chords /> },
      { path: '/pitch-training', element: <PitchTraining /> },
      { path: '/tablature', element: <Tablature /> },
    ],
  },
])
