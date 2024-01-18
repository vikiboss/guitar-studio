import { useEffect, useRef } from 'react'
import { RangeSlider as Slider } from 'toolcool-range-slider'

import 'toolcool-range-slider'

export interface RangeSliderProps extends Omit<Partial<Slider>, 'style'> {
  style?: Partial<React.CSSProperties>
  mousewheelDisabled?: boolean
  onChange?: (value: number) => void
}

const RangeSlider = (props: RangeSliderProps) => {
  const sliderRef = useRef<Slider>(null)

  const { value, mousewheelDisabled, ...rest } = props

  useEffect(() => {
    sliderRef.current && (sliderRef.current.value = value ?? 0)
  }, [value])

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    // @ts-expect-error
    slider.mousewheelDisabled = mousewheelDisabled

    Object.assign(slider, rest)
    Object.assign(slider.style, props.style)

    const onChange = (evt: Event) => {
      const customEvent = evt as CustomEvent
      props.onChange?.(customEvent.detail.value)
    }

    slider.addEventListener('change', onChange)

    return () => {
      slider.removeEventListener('change', onChange)
    }
  }, [])

  return (
    <div>
      <tc-range-slider ref={sliderRef} />
    </div>
  )
}

export default RangeSlider
