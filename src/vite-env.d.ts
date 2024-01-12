/// <reference types="vite/client" />

declare module 'vexchords' {
  type StyleOptions = {
    width?: number
    height?: number
    circleRadius?: number
    numStrings?: number
    numFrets?: number
    showTuning?: boolean
    defaultColor?: string
    bgColor?: string
    strokeColor?: string
    textColor?: string
    stringColor?: string
    fretColor?: string
    labelColor?: string
    fretWidth?: number
    stringWidth?: number
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
    fontStyle?: string
    labelWeight?: string
  }
  export class ChordBox {
    constructor(element: string, style?: StyleOptions)

    draw(): void
  }

  export function draw(
    element: string,
    options?: {
      chord: [number, number | string, number | string][]
      position?: number
      barres?: { fromString: number; toString: number; fret: number }[]
      tuning?: string[]
    },
    styleOptions?: StyleOptions,
  ): void
}
