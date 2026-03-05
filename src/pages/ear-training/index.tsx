import { useMediaQuery } from '@geist-ui/core'
import { useTranslation } from 'react-i18next'

import { cn } from '@/utils'
import { store, INTERVALS, generateQuestion } from './store'

let _ctx: AudioContext | null = null
const getCtx = () => {
  if (!_ctx) _ctx = new AudioContext()
  return _ctx
}

function playInterval(rootFreq: number, semitones: number) {
  const ctx = getCtx()
  if (ctx.state === 'suspended') ctx.resume()

  const now = ctx.currentTime
  const duration = 0.75
  const secondFreq = rootFreq * Math.pow(2, semitones / 12)

  const playNote = (freq: number, startTime: number) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.4, startTime)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
    osc.start(startTime)
    osc.stop(startTime + duration)
  }

  playNote(rootFreq, now)
  playNote(secondFreq, now + duration + 0.1)
}

function nextQuestion() {
  const q = generateQuestion()
  store.mutate.correctIdx = q.correctIdx
  store.mutate.choices = q.choices
  store.mutate.rootFreq = q.rootFreq
  store.mutate.answered = false
  store.mutate.lastCorrect = false
}

const ns = ['ear-training'] as const

export function EarTraining() {
  const state = store.useState()
  const isLg = useMediaQuery('lg')
  const { t } = useTranslation(ns)

  const currentInterval = INTERVALS[state.correctIdx]

  const handlePlay = () => {
    playInterval(state.rootFreq, currentInterval.semitones)
  }

  const handleAnswer = (choiceIdx: number) => {
    if (state.answered) return
    const correct = choiceIdx === state.correctIdx
    store.mutate.answered = true
    store.mutate.lastCorrect = correct
    store.mutate.total += 1
    if (correct) store.mutate.correct += 1
  }

  const btnBase =
    'select-none py-2 px-4 rounded-2 hover:cursor-pointer transition-colors text-sm font-medium'

  return (
    <div>
      <div className={cn('flex-col-center gap-10', isLg ? 'w-880px' : 'w-92vw')}>
        {/* Score */}
        <div className='flex gap-6 text-sm'>
          <span className='text-lime-6 dark:text-lime-4'>
            {t('ear-training:correct-label')}: {state.correct}
          </span>
          <span className='opacity-50'>
            {t('ear-training:total-label')}: {state.total}
          </span>
          {state.total > 0 && (
            <span className='opacity-50'>
              {Math.round((state.correct / state.total) * 100)}%
            </span>
          )}
        </div>

        {/* Play button */}
        <div className='flex-col-center gap-2'>
          <div
            onClick={handlePlay}
            className={cn(
              btnBase,
              'flex gap-2 items-center px-8 py-3 text-base bg-zinc-1 dark:bg-zinc-7 hover:bg-zinc-2 dark:hover:bg-zinc-6',
            )}
          >
            <div className='i-mdi-play-circle text-xl' />
            {t('ear-training:play-interval')}
          </div>
          {state.answered && (
            <span
              className='text-xs opacity-50 hover:cursor-pointer hover:opacity-100'
              onClick={handlePlay}
            >
              {t('ear-training:play-again')}
            </span>
          )}
        </div>

        {/* Answer choices */}
        <div className='grid grid-cols-2 gap-3'>
          {state.choices.map(idx => {
            const interval = INTERVALS[idx]
            let colorClass = 'bg-zinc-1 dark:bg-zinc-7 hover:bg-zinc-2 dark:hover:bg-zinc-6'
            if (state.answered) {
              if (idx === state.correctIdx) {
                colorClass = 'bg-lime-1 dark:bg-lime-9/30 border border-solid border-lime-5'
              } else {
                colorClass = 'opacity-40'
              }
            }
            return (
              <div
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={cn(btnBase, colorClass, 'text-center min-w-36')}
              >
                {t(`ear-training:intervals.${interval.name}` as never, interval.name)}
              </div>
            )
          })}
        </div>

        {/* Feedback + Next */}
        {state.answered && (
          <div className='flex-col-center gap-4'>
            <span
              className={cn(
                'text-base font-medium',
                state.lastCorrect ? 'text-lime-6 dark:text-lime-4' : 'text-red-5',
              )}
            >
              {state.lastCorrect
                ? t('ear-training:correct-feedback')
                : t('ear-training:wrong-feedback', {
                    name: t(`ear-training:intervals.${currentInterval.name}` as never, currentInterval.name),
                  })}
            </span>
            <div
              onClick={nextQuestion}
              className={cn(
                btnBase,
                'flex gap-1 items-center bg-zinc-1 dark:bg-zinc-7 hover:bg-zinc-2 dark:hover:bg-zinc-6',
              )}
            >
              <div className='i-mdi-arrow-right' />
              {t('ear-training:next')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
