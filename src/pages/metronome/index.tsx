import CountUp from 'react-countup'
import { useMediaQuery } from '@geist-ui/core'
import { useTranslation } from 'react-i18next'

import { cn } from '@/utils'
import { store } from './store'
import { getAudioContext, getBeatSounds } from './sounds'
import { usePrevious, useUnmount } from '@/hooks'

// Module-level scheduler state (prevents stale closures across re-renders)
let schedulerTimer: number = 0
let nextNoteTime: number = 0
let scheduledBeat: number = 0
const tapTimes: number[] = []

const LOOKAHEAD_MS = 25
const SCHEDULE_AHEAD_SEC = 0.1

function scheduleNote(beat: number, time: number) {
  const ctx = getAudioContext()
  const sounds = getBeatSounds()
  const source = ctx.createBufferSource()
  source.buffer = beat === 0 ? sounds.accent : sounds.regular
  source.connect(ctx.destination)
  source.start(time)

  // Schedule visual beat indicator update in sync with audio
  const delay = Math.max(0, (time - ctx.currentTime) * 1000)
  window.setTimeout(() => {
    store.mutate.currentBeat = beat
  }, delay)
}

function runScheduler() {
  const ctx = getAudioContext()
  const { bpm, beatsPerMeasure } = store.mutate

  while (nextNoteTime < ctx.currentTime + SCHEDULE_AHEAD_SEC) {
    scheduleNote(scheduledBeat, nextNoteTime)
    nextNoteTime += 60 / bpm
    scheduledBeat = (scheduledBeat + 1) % beatsPerMeasure
  }

  schedulerTimer = window.setTimeout(runScheduler, LOOKAHEAD_MS)
}

function startMetronome() {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  nextNoteTime = ctx.currentTime
  scheduledBeat = 0
  store.mutate.isPlaying = true
  runScheduler()
}

function stopMetronome() {
  window.clearTimeout(schedulerTimer)
  schedulerTimer = 0
  store.mutate.isPlaying = false
  store.mutate.currentBeat = -1
}

function handleTap() {
  const now = Date.now()
  if (tapTimes.length > 0 && now - tapTimes[tapTimes.length - 1] > 3000) {
    tapTimes.length = 0
  }
  tapTimes.push(now)
  if (tapTimes.length > 8) tapTimes.shift()
  if (tapTimes.length >= 2) {
    const intervals = tapTimes.slice(1).map((t, i) => t - tapTimes[i])
    const avg = intervals.reduce((s, v) => s + v, 0) / intervals.length
    store.mutate.bpm = Math.max(1, Math.min(240, Math.round(60000 / avg)))
  }
}

const btnClass =
  'select-none flex gap-1 items-center py-2 px-4 rounded-2 dark:bg-zinc-6 bg-zinc-1 dark:hover:bg-zinc-5 hover:bg-zinc-2 hover:cursor-pointer'

export function Metronome() {
  const state = store.useState()
  const isLg = useMediaQuery('lg')
  const { t } = useTranslation(['common'])
  const prevBpm = usePrevious(state.bpm)

  useUnmount(stopMetronome)

  return (
    <div>
      <div className={cn('flex-col-center gap-12', isLg ? 'w-880px' : 'w-92vw')}>
        {/* Beat indicator dots */}
        <div className='flex gap-3'>
          {Array.from({ length: state.beatsPerMeasure }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-5 h-5 rounded-full transition-colors duration-50',
                state.currentBeat === i
                  ? i === 0
                    ? 'bg-red-5 shadow shadow-red-3'
                    : 'bg-blue-5 shadow shadow-blue-3'
                  : 'bg-zinc-2 dark:bg-zinc-7',
              )}
            />
          ))}
        </div>

        {/* BPM display */}
        <div className='flex-col-center'>
          <CountUp
            className='font-medium text-24 font-mono tracking-wide'
            start={prevBpm}
            end={state.bpm}
            duration={0.1}
          />
          <span className='tracking-wide bg-zinc-2/80 dark:bg-zinc-6 px-3 py-1 rounded text-center'>
            BPM
          </span>
        </div>

        {/* Slider */}
        <div className='flex-between gap-4'>
          <div
            onClick={() => state.bpm > 1 && (store.mutate.bpm -= 1)}
            className='select-none w-8 h-8 flex-center text-xl rounded-2 hover:cursor-pointer dark:bg-zinc-6 bg-zinc-1 dark:hover:bg-zinc-5 hover:bg-zinc-2'
          >
            -
          </div>
          <input
            type='range'
            onChange={e => (store.mutate.bpm = +e.target.value)}
            max={240}
            min={1}
            step={1}
            className={cn('h-48px', isLg ? 'w-800px' : 'w-60vw')}
            list='bpm-value'
            value={state.bpm}
          />
          <datalist id='bpm-value'>
            {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220].map(v => (
              <option key={v} value={v} />
            ))}
          </datalist>
          <div
            onClick={() => state.bpm < 240 && (store.mutate.bpm += 1)}
            className='select-none w-8 h-8 flex-center text-xl rounded-2 hover:cursor-pointer dark:bg-zinc-6 bg-zinc-1 dark:hover:bg-zinc-5 hover:bg-zinc-2'
          >
            +
          </div>
        </div>

        {/* Controls */}
        <div className='flex gap-2 items-center'>
          <div onClick={state.isPlaying ? stopMetronome : startMetronome} className={btnClass}>
            <div className={state.isPlaying ? 'i-mdi-stop' : 'i-mdi-play'} />
            {state.isPlaying ? t('common:stop') : t('common:start')}
          </div>
          <div onClick={handleTap} className={btnClass}>
            <div className='i-mdi-gesture-tap-hold' />
            Tap BPM
          </div>
        </div>
      </div>
    </div>
  )
}
