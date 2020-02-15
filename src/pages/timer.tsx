import { Box, CardActions, Checkbox, Fab, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Select, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import { addMinutes, addSeconds, differenceInHours, differenceInMinutes, differenceInSeconds, isBefore } from 'date-fns'
import { addHours } from 'date-fns/esm'
import React from 'react'

import { withLayout } from '../components/Layout'

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
  timerContainer: {
    margin: theme.spacing(6, 0),
  },
  timerName: {

  },
  rightIcon: {
    transform: 'rotate(180deg)',
  },
}))

interface Counter {
  hours: number
  minutes: number
  seconds: number
}

interface TimerState extends Counter {
  status: 'started' | 'stopped' | 'paused'
}

const Timer = () => {
  const { actions, container, timerContainer, divider, select, timerName, rightIcon } = useStyles()

  const [timers, setTimers] = React.useState<TimerState[]>([{ hours: 0, minutes: 5, seconds: 5, status: 'stopped' }])
  const [counter, setCounter] = React.useState<{ current: Date | null, target: Date | null }>({ current: null, target: null })
  const [options, setOptions] = React.useState({
    repeat: false,
  })
  const [current, setCurrent] = React.useState(0)

  const getEndTime = React.useCallback(({ hours = 0, minutes = 0, seconds = 0 }: Partial<Counter>) => {
    const time = addSeconds(addMinutes(addHours(new Date, hours), minutes), seconds)
    return time
  }, [])

  const timer = React.useMemo(() => timers[current], [current, timers])
  const setTimer = React.useCallback((t: Partial<TimerState>) => {
    setTimers((list) => list.map((item, index) => {
      if (index === current) {
        return { ...item, ...t }
      }
      return item
    }))
  }, [current])

  const updateCounter = React.useCallback(() => {
    setCounter((c) => ({
      ...c,
      current: new Date,
    }))
  }, [])

  React.useEffect(() => {
    if (timer.status !== 'started') { return }
    console.log('a')
    if (options.repeat && counter.current && counter.target && isBefore(counter.current, counter.target)) {
      setCurrent((c) => c < timers.length - 1 ? c + 1 : 0)
    }
  }, [counter, options.repeat, timer.status, timers.length])

  React.useEffect(() => {
    if (timer.status !== 'started') { return }

    setCounter({ current: new Date, target: getEndTime(timer) })
    updateCounter()
    const t = setInterval(updateCounter, 1000)
    return () => clearInterval(t)
  }, [updateCounter, timer.status, timer, getEndTime])

  const addTimer = React.useCallback(() => {
    setTimers(timers.concat(timers.slice(-1)))
    setCurrent(timers.length)
  }, [timers])

  return (
    <Box className={container}>
      <Box className={timerContainer}>
        <Typography className={timerName} variant="h4" paragraph>{current + 1}</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            if (current > 0) {
              setCurrent(current - 1)
            }
          }}
          disabled={current === 0}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Select
          native
          className={select}
          variant="outlined"
          value={timer.status === 'stopped' ? timer.hours : differenceInHours(counter.target, counter.current)}
          onChange={(evt) => setTimer({ hours: Number(evt.target.value) })}
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
          value={timer.status === 'stopped' ? timer.minutes : differenceInMinutes(counter.target, counter.current) % 60}
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
          value={timer.status === 'stopped' ? timer.seconds : differenceInSeconds(counter.target, counter.current) % 60}
          onChange={(evt) => setTimer({ seconds: Number(evt.target.value) })}
          IconComponent={() => <></>}
        >
          {Array(60).fill(0).map((_, i) => {
            return (
              <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
            )
          })}
        </Select>
        <IconButton
          color="inherit"
          className={rightIcon}
          onClick={() => {
            if (current < timers.length - 1) {
              setCurrent(current + 1)
            }
          }}
          disabled={current === timers.length - 1}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <CardActions className={actions}>
        {timer.status !== 'started' && (
          <Fab
            color="primary"
            onClick={() => {
              if (timer.status === 'paused') {
                setTimer({ status: 'started' })
              } else {
                setTimer({ status: 'started' })
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
        <Fab
          color="primary"
          onClick={addTimer}
        >
          <AddIcon />
        </Fab>
      </CardActions>
      <Grid container justify="center">
        <Grid item xs={6}>
          <List>
            <ListItem
              button
              onClick={() => setOptions({ ...options, repeat: !options.repeat })}
            >
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  checked={options.repeat}
                />
              </ListItemIcon>
              <ListItemText
                primary="Repeat"
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default withLayout(Timer, {
  title: 'Timer',
})
