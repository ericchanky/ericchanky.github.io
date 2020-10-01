import { Box, Grid, IconButton, InputBase, makeStyles } from '@material-ui/core'
import Axios from 'axios'
import { observer } from 'mobx-react'
import qs from 'qs'
import React from 'react'

import { storeContext } from '../store'
import Config from '../store/config'

interface Props {
  required?: boolean
  passthrough?: boolean
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
  button: ({ t }: { t: 'light' | 'dark' }) => ({
    border: t === 'light' ? '2px solid rgba(40,40,40,0.6)' : '2px solid #fff',
    padding: '2rem',
    position: 'relative',
  }),
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
  codePadContainer: {
    width: 350,
  },
}))

// Password length
const PasswordLength = 6

interface CodePadProps {
  theme: Config['theme']
  password: string
  setPassword(pw: string): void
}

export const CodePad = ({ password, setPassword, theme }: CodePadProps) => {
  const { button, label, item, input, codePadContainer } = useStyles({ t: theme })

  return (
    <Box className={codePadContainer}>
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
  )
}

export const withAuth = (Component: (props: AuthProps) => JSX.Element, { required = false, passthrough = false }: Props) => observer(() => {
  const { config, image } = React.useContext(storeContext)
  const { container, verticle } = useStyles({ t: config.theme })

  const [password, setPassword] = React.useState(config.password)

  React.useEffect(() => {
    // init password by query params
    const query = qs.parse(location.search.substring(1))
    if (query.password && typeof query.password === 'string') {
      setPassword(query.password)
    }
  }, [])

  React.useEffect(() => {
    // touch server
    Axios.get('https://dzway.herokuapp.com/')
  }, [])

  const validatePassword = React.useCallback(async (pw: string) => {
    if (passthrough) {
      return config.set({ password: pw })
    }

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

  React.useEffect(() => {
    const keypress = (evt: KeyboardEvent) => {
      if (config.password.length < PasswordLength) {
        setPassword((pwd) => `${pwd}${evt.key}`)
      }
    }
    window.addEventListener('keypress', keypress)
    return () => window.removeEventListener('keypress', keypress)
  }, [config.password.length])

  if (config.password.length < PasswordLength && required) {
    return (
      <Box className={container}>
        <Box className={verticle}>
          <CodePad
            theme={config.theme}
            password={password}
            setPassword={setPassword}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Component password={password} />
  )
})
