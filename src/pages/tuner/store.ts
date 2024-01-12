import { create } from '@/utils/create-store'

export const store = create({
  pitch: 0,
  clarity: 0,

  interval: 50,

  minClarity: 0.9,
  minVolumeDecibels: -30,
})
