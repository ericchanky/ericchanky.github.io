import { Typography } from '@material-ui/core'
import React from 'react'

import sound from './sound'

interface CounterProps {
  timer: number
  next: () => void
  status: 'started' | 'stopped' | 'paused'
}

const Counter = ({ timer, status, next }: CounterProps) => {
  const [counter, setCounter] = React.useState<number>()

  React.useEffect(() => {
    if (status === 'started') {
      setCounter(timer)
    }
  }, [status, timer])

  React.useEffect(() => {
    if (counter === 0) {
      setCounter(undefined)
      next()
    }
  }, [counter, next])

  React.useEffect(() => {
    if (status !== 'started') { return }

    const t = setInterval(() => {
      setCounter((c) => c && c - 1)
    }, 1000)

    return () => clearInterval(t)
  }, [status])

  React.useEffect(() => {
    if (status === 'started') {
      if (counter === 3 || counter === 2 || counter === 1) {
        sound('C4', '8n')
      }
      if (counter === 0) {
        sound('C6', '8n')
      }
    }
  }, [counter, status])

  const displayText = React.useMemo(() => {
    if (!counter) { return '' }

    const h = Math.floor(counter / 60 / 60)
    const m = Math.floor((counter - h * 60 * 60) /60)
    const s = Math.floor(counter % 60 % 60)

    if (h === 0) {
      return `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`
    }
    return `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`
  }, [counter])

  return (
    <Typography variant="h1">
      {displayText}
    </Typography>
  )
}

export default Counter
