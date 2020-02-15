import { Box, Grid, IconButton, InputBase, makeStyles } from '@material-ui/core'
import Axios from 'axios'
import { observer } from 'mobx-react'
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
    transform: 'translateY(-60%)',
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
const PasswordLength = 6

export const withAuth = (Component: (props: AuthProps) => JSX.Element, { required = false }: Props) => observer(() => {
  const { container, verticle, button, label, item, input } = useStyles()
  const { config, image } = React.useContext(storeContext)

  const [password, setPassword] = React.useState(config.password)

  React.useEffect(() => {
    // touch server
    Axios.get('https://dzway.herokuapp.com/')
  }, [])

  const validatePassword = React.useCallback(async (pw: string) => {
    try {
      await image.fetchAuth(pw)
      config.set({ password: pw })
    } catch (err) {
      setPassword('')
    }
  }, [config, image])

  React.useEffect(() => {
    if (password.length < PasswordLength) { return }
    validatePassword(password)
  }, [password, validatePassword])

  if (config.password.length < PasswordLength && required) {
    return (
      <Box className={container}>
        <Box className={verticle}>
          <InputBase
            readOnly
            classes={{ input }}
            value={password.replace(/./g, '*')}
          />
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
                        return
                      }
                      setPassword(`${password}${t}`)
                    }}
                    disabled={password.length >= PasswordLength}
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
})
