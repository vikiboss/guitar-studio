import React from 'react'
import { Toaster } from 'sonner'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import '@unocss/reset/normalize.css'
import 'virtual:uno.css'

import './index.css'
import './i18n/index.ts'

import { router } from './router/index.tsx'

const mainDiv = document.getElementById('main')

if (mainDiv) {
  const root = createRoot(mainDiv)

  root.render(
    <React.StrictMode>
      <Toaster position='bottom-center' />
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
} else {
  console.error('mainDiv is null')
}
