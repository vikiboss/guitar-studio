import { defineConfig, presetUno, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx}']
  },
  presets: [presetUno()],
  rules: []
})
