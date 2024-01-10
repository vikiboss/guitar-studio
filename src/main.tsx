import React from 'react'
import { createRoot } from 'react-dom/client'

import 'modern-normalize/modern-normalize.css'
import 'virtual:uno.css'
import './index.css'
import './i18n.ts'

import { App } from './app.tsx'

const mainDiv = document.getElementById('main')

if (mainDiv) {
  const root = createRoot(mainDiv)

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error('mainDiv is null')
}
