import { create } from '@/utils/create-store'

export const store = create({
  pitch: 0,
  clarity: 0,

  // the interval in milliseconds between each update
  interval: 50,

  minDelta: 1,
  minClarity: 0.9,
  // the minimum volume in decibels, with 0 being the loudest sound, and -100 being silence
  minVolumeDecibels: -30, // this means 30% of the loudest sound, while -10 means 10% of the loudest sound
})
