import { Box, CardActions, Fab, makeStyles, Select, Typography } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import { addMinutes, addSeconds, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { addHours } from 'date-fns/esm'
import React from 'react'

import { withLayout } from '../components/Layout'
import useObject from '../components/useObject'

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  actions: {
    justifyContent: 'center',
  },
  divider: {
    margin: theme.spacing(0, 2),
  },
  select: {
    fontSize: '2rem',
  },
}))

interface Counter {
  hours: number
  minutes: number
  seconds: number
}

interface TimerState extends Counter {
  status: 'started' | 'stopped' | 'paused'
  endTime: Date
}

const Timer = () => {
  const { actions, container, divider, select } = useStyles()

  const [timer, setTimer] = useObject<TimerState>({ hours: 0, minutes: 5, seconds: 5, status: 'stopped', endTime: new Date })
  const [counter, setCounter] = React.useState({ hours: 0, minutes: 0, seconds: 0 })

  const updateCounter = React.useCallback(() => {
    setCounter({
      hours: differenceInHours(timer.endTime, new Date),
      minutes: differenceInMinutes(timer.endTime, new Date) % 60,
      seconds: differenceInSeconds(timer.endTime, new Date) % 60,
    })
  }, [timer.endTime])

  React.useEffect(() => {
    if (timer.status !== 'started') { return }

    updateCounter()
    const t = setInterval(updateCounter, 1000)
    return () => clearInterval(t)
  }, [updateCounter, timer.endTime, timer.status])

  const getEndTime = React.useCallback(({ hours, minutes, seconds }: Counter) => {
    const time = addSeconds(addMinutes(addHours(new Date, hours), minutes), seconds)
    return time
  }, [])

  return (
    <Box className={container}>
      <Select
        native
        className={select}
        variant="outlined"
        value={timer.status === 'stopped' ? timer.minutes : counter.minutes}
        onChange={(evt) => setTimer({ minutes: Number(evt.target.value) })}
        IconComponent={() => <></>}
      >
        {Array(60).fill(0).map((_, i) => {
          return (
            <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
          )
        })}
      </Select>
      <Typography display="inline" className={divider}>:</Typography>
      <Select
        native
        className={select}
        variant="outlined"
        value={timer.status === 'stopped' ? timer.seconds : counter.seconds}
        onChange={(evt) => setTimer({ seconds: Number(evt.target.value) })}
        IconComponent={() => <></>}
      >
        {Array(60).fill(0).map((_, i) => {
          return (
            <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
          )
        })}
      </Select>
      <CardActions className={actions}>
        {timer.status !== 'started' && (
          <Fab
            color="primary"
            onClick={() => {
              if (timer.status === 'paused') {
                setTimer({ status: 'started', endTime: getEndTime(counter) })
              } else {
                setTimer({ status: 'started', endTime: getEndTime(timer) })
              }
            }}
          >
            <PlayIcon />
          </Fab>
        )}
        {timer.status === 'started' && (
          <Fab
            color="primary"
            onClick={() => setTimer({ status: 'stopped' })}
          >
            <StopIcon />
          </Fab>
        )}
        <Fab
          color="primary"
          onClick={() => setTimer({ status: 'paused' })}
          disabled={timer.status !== 'started'}
        >
          <PauseIcon />
        </Fab>
      </CardActions>
    </Box>
  )
}

export default withLayout(Timer, {
  title: 'Timer',
})
