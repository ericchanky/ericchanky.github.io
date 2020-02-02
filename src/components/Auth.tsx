import { Box, Grid, IconButton, InputBase, makeStyles } from '@material-ui/core'
import React from 'react'

import { storeContext } from '../store'

interface Props {
  required?: boolean
}

export interface AuthProps {
  password: string
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: 350,
    margin: 'auto',
    height: '100vh',
  },
  verticle: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  item: {
    textAlign: 'center',
  },
  button: {
    border: '2px solid #fff',
    padding: '2rem',
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  input: {
    width: '100%',
    textAlign: 'center',
    color: 'inherit',
    fontSize: '2rem',
    letterSpacing: theme.spacing(3),
    textIndent: theme.spacing(3),
  },
}))

// Password length
const length = 6

export const withAuth = (Component: (props: AuthProps) => JSX.Element, { required = false }: Props) => () => {
  const { container, verticle, button, label, item, input } = useStyles()
  const { config } = React.useContext(storeContext)

  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    if (password.length < length) { return }
    config.set({ password })
  }, [config, password])

  if (password.length < length && required) {
    return (
      <Box className={container}>
        <Box className={verticle}>
          <InputBase classes={{ input }} value={Array(password.length).fill('*').join('')} />
          <Grid container spacing={2}>
            {'123456789*0<'.split('').map((t) => {
              return (
                <Grid item key={t} xs={4} className={item}>
                  <IconButton
                    className={button}
                    classes={{ label }}
                    color="inherit"
                    onClick={() => {
                      if (t === '<') {
                        setPassword(password.slice(0, -1))
                      }
                      setPassword(`${password}${t}`)
                    }}
                  >
                    {t}
                  </IconButton>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Box>
    )
  }

  return (
    <Component password={password} />
  )
}
