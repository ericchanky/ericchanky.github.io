import { AppBar, Box, CardContent, createGenerateClassName, createMuiTheme, CssBaseline, fade, IconButton, makeStyles, StylesProvider, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import deepOrange from '@material-ui/core/colors/deepOrange'
import deepPurple from '@material-ui/core/colors/deepPurple'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import GitHubIcon from '@material-ui/icons/GitHub'
import MenuIcon from '@material-ui/icons/Menu'
import { observer } from 'mobx-react'
import qs from 'qs'
import React from 'react'
import Hammer from 'react-hammerjs'
import Helmet, { HelmetProps } from 'react-helmet'

import store, { persist, storeContext } from '../store'
import { Actions, emitter } from '../utils/event'
import GridDivider from './GridDivider'
import MenuDialog from './MenuDialog'

const titleTemplate = (t: string) => `${t} | Tools`

const lightTheme = (raw: boolean) => createMuiTheme({
  typography: {
    fontFamily: 'Nunito, "LiHei Pro", "Microsoft JhengHei", sans-serif',
    fontSize: 14,
  },
  palette: {
    primary: {
      main: deepOrange.A400,
      contrastText: '#fff',
    },
    secondary: {
      main: deepPurple[600],
      contrastText: '#fff',
    },
    background: {
      default: raw ? 'rgba(0,0,0,0)' : undefined,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
})

const darkTheme = (raw: boolean) => createMuiTheme({
  typography: {
    fontFamily: 'Nunito, "LiHei Pro", "Microsoft JhengHei", sans-serif',
    fontSize: 14,
  },
  palette: {
    primary: {
      main: '#444',
      contrastText: '#f5f5f5',
    },
    secondary: {
      main: '#ddd',
      contrastText: '#333',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#aaa',
    },
    background: {
      paper: '#444',
      default: raw ? 'rgba(0,0,0,0)' : '#222',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '::selection': {
          background: fade('#7b1fa2', 0.85),
        },
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#f5f5f5',
      },
    },
  },
})

interface Props extends HelmetProps {
  disableHeader?: boolean
  theme?: 'dark' | 'light'
}

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  productionPrefix: 'c',
})

export const withLayout = (Component: () => JSX.Element, { title = 'Home Page', disableHeader = false, theme, ...props }: Props) => {
  const Layout = () => {
    const { main, menuButton } = useStyles()
    const { config } = React.useContext(storeContext)

    const [open, setOpen] = React.useState(false)
    const [ready, setReady] = React.useState(false)
    const [raw, setRaw] = React.useState(false)

    React.useEffect(() => {
      document.title = titleTemplate(title)
    }, [])

    React.useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentElement) {
        jssStyles.parentElement.removeChild(jssStyles)
      }
    }, [])

    React.useEffect(() => {
      persist().then(() => {
        setReady(true)
      })
    }, [])

    // const pageHide = React.useCallback(() => setReady(false), [])
    // const pageShow = React.useCallback(() => {
    //   setReady(true)
    // }, [])

    // React.useEffect(() => {
    //   window.addEventListener('visibilitychange', pageHide)
    //   window.addEventListener('visibilitychange', pageShow)

    //   return () => {
    //     window.removeEventListener('visibilitychange', pageHide)
    //     window.removeEventListener('visibilitychange', pageShow)
    //   }
    // }, [pageHide, pageShow])

    const openGithub = React.useCallback(() => {
      if (typeof window === 'undefined') { return }
      window.open('https://github.com/ericchanky/ericchanky.github.io', '__blank')
    }, [])

    const selectedTheme = React.useMemo(() => {
      if (theme) { return theme }
      return config.theme
    }, [config.theme])

    const toggleMenu = React.useCallback((evt: HammerInput) => {
      if (evt.center.y - evt.deltaY > 100) { return }
      setOpen(true)
    }, [])

    React.useEffect(() => {
      emitter.on(Actions.SWIPE_DOWN, toggleMenu)
      return () => {
        emitter.off(Actions.SWIPE_DOWN, toggleMenu)
      }
    }, [toggleMenu])

    React.useEffect(() => {
      // toggle auto mode
      const query = qs.parse(location.search.substring(1))
      if (query.auto) {
        setRaw(true)
      }
    }, [])

    const customizedTheme = React.useMemo(() => {
      if (selectedTheme === 'dark') { return darkTheme(raw) }
      return lightTheme(raw)
    }, [raw, selectedTheme])

    return (
      <StylesProvider generateClassName={generateClassName}>
        <storeContext.Provider value={store}>
          <ThemeProvider theme={customizedTheme}>
            <Hammer
              direction="DIRECTION_ALL"
              onSwipe={(evt) => {
                emitter.emit(Actions.SWIPE, evt)
                if (evt.direction === 2) {
                  emitter.emit(Actions.SWIPE_LEFT, evt)
                }
                if (evt.direction === 4) {
                  emitter.emit(Actions.SWIPE_RIGHT, evt)
                }
                if (evt.direction === 8) {
                  emitter.emit(Actions.SWIPE_UP, evt)
                }
                if (evt.direction === 16) {
                  emitter.emit(Actions.SWIPE_DOWN, evt)
                }
              }}
              onTap={(evt) => emitter.emit(Actions.TAP, evt)}
              onDoubleTap={(evt) => emitter.emit(Actions.DOUBLE_TAP, evt)}
              onPanStart={(evt) => emitter.emit(Actions.PAN_START, evt)}
              onPanEnd={(evt) => emitter.emit(Actions.PAN_END, evt)}
              onPan={(evt) => emitter.emit(Actions.PAN, evt)}
              onPinchStart={(evt) => emitter.emit(Actions.PINCH_START, evt)}
              onPinchEnd={(evt) => emitter.emit(Actions.PINCH_END, evt)}
              onPinch={(evt) => emitter.emit(Actions.PINCH, evt)}
              options={{
                recognizers: {
                  pinch: { enable: true },
                },
              }}
            >
              <Box>
                <CssBaseline />
                <Helmet
                  htmlAttributes={{ lang: 'en' }}
                  title={titleTemplate(title)}
                  {...props}
                />
                {!disableHeader && (
                  <AppBar>
                    <Toolbar>
                      <IconButton
                        color="inherit"
                        className={menuButton}
                        onClick={() => setOpen(true)}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h5" component="h1">{title}</Typography>
                      <GridDivider />
                      <IconButton
                        color="inherit"
                        onClick={() => config.set({ theme: config.theme === 'dark' ? 'light' : 'dark' })}
                      >
                        {selectedTheme === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
                      </IconButton>
                      <IconButton
                        color="inherit"
                        onClick={openGithub}
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                )}
                <Box component="main" className={main}>
                  {!disableHeader && <Toolbar />}
                  {!disableHeader && ready && (
                    <CardContent>
                      <Component />
                    </CardContent>
                  )}
                  {disableHeader && ready && <Component />}
                </Box>
                <MenuDialog
                  dialogProps={{ open }}
                  onClose={() => setOpen(false)}
                />
              </Box>
            </Hammer>
          </ThemeProvider>
        </storeContext.Provider>
      </StylesProvider>
    )
  }

  return observer(Layout)
}
