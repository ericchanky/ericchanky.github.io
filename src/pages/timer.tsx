import { Box, CardActions, CardContent, Checkbox, Fab, Grid, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import RemoveIcon from '@material-ui/icons/Remove'
import StopIcon from '@material-ui/icons/Stop'
import React, { useEffect } from 'react'

import Counter from '../components/Counter'
import { withLayout } from '../components/Layout/withLayout'
import sound from '../components/sound'

const Unit = {
  HOUR: 60 * 60,
  MINUTE: 60,
  SECOND: 1,
}

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    margin: theme.spacing(6, 0),
  },
  rightIcon: {
    transform: 'rotate(180deg)',
  },
  textCenter: {
    textAlign: 'center',
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
  const { container, rightIcon, textCenter } = useStyles()

  const [timers, setTimers] = React.useState<number[]>([0])
  const [options, setOptions] = React.useState({
    repeat: false,
  })
  const [status, setStatus] = React.useState<TimerState['status']>('stopped')
  const [current, setCurrent] = React.useState(0)

  const timer = React.useMemo(() => timers[current] || 0, [current, timers])

  const setTimer = React.useCallback((newTime: number) => {
    setTimers((t) => [...t.slice(0, current), newTime, ...t.slice(current + 1)])
  }, [current])

  const [hour, minute, second] = React.useMemo(() => {
    const h = Math.floor(timer / 60 / 60)
    const m = Math.floor((timer - h * 60 * 60) /60)
    const s = Math.floor(timer % 60 % 60)
    return [h, m, s]
  }, [timer])

  useEffect(() => {
    setCurrent(timers.length - 1)
  }, [timers.length])

  return (
    <Box className={container}>
      <CardContent>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid container item justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <Fab
                color="primary"
                onClick={() => {
                  setCurrent(timers.length)
                  setTimers(timers.concat(0))
                }}
              >
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h4">{current + 1}</Typography>
            </Grid>
            <Grid item>
              <Fab
                color="primary"
                onClick={() => {
                  setCurrent(timers.length - 1)
                  setTimers([...timers.slice(0, current), ...timers.slice(current + 1)])
                }}
                disabled={timers.length === 1}
              >
                <RemoveIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid container item xs={5} spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                aria-readonly
                variant="outlined"
                label="Hour"
                value={hour}
                inputProps={{
                  className: textCenter,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setTimer(timer + Unit.HOUR)
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setTimer(timer > Unit.HOUR ? timer - Unit.HOUR : timer)
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                aria-readonly
                variant="outlined"
                label="Minute"
                value={minute}
                inputProps={{
                  className: textCenter,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setTimer(timer + Unit.MINUTE)
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setTimer(timer > Unit.MINUTE ? timer - Unit.MINUTE : timer)
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                aria-readonly
                variant="outlined"
                label="Second"
                value={second}
                inputProps={{
                  className: textCenter,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setTimer(timer + Unit.SECOND)
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setTimer(Math.max(timer - Unit.SECOND, 0))
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="center" spacing={2}>
          {status !== 'started' && (
            <Grid item>
              <Fab
                color="primary"
                onClick={() => {
                  if (timer > 3) {
                    sound('G4', '8n')
                    sound('C5', '8n', 0.05)
                  }
                  if (status === 'stopped') {
                    setCurrent(0)
                  }
                  setStatus('started')
                }}
              >
                <PlayIcon />
              </Fab>
            </Grid>
          )}
          {status === 'started' && (
            <Grid item>
              <Fab
                color="primary"
                onClick={() => setStatus('stopped')}
              >
                <StopIcon />
              </Fab>
            </Grid>
          )}
          <Grid item>
            <Fab
              color="primary"
              onClick={() => setStatus('paused')}
              disabled={status !== 'started'}
            >
              <PauseIcon />
            </Fab>
          </Grid>
        </Grid>
      </CardActions>
      <Counter
        timer={timer}
        status={status}
        next={() => {
          if (current === timers.length - 1) {
            if (options.repeat) {
              setCurrent(0)
            } else {
              setStatus('stopped')
            }
          } else {
            setCurrent(current + 1)
          }
        }}
      />
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
