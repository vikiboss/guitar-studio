import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import '@unocss/reset/normalize.css'
import 'virtual:uno.css'

import './index.css'
import './i18n.ts'

import { router } from './router'

const mainDiv = document.getElementById('main')

if (mainDiv) {
  const root = createRoot(mainDiv)

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
} else {
  console.error('mainDiv is null')
}
