import { AppBar, Box, CardContent, createMuiTheme, CssBaseline, Dialog, DialogContent, fade, IconButton, Input, makeStyles, TextField, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import deepOrange from '@material-ui/core/colors/deepOrange'
import deepPurple from '@material-ui/core/colors/deepPurple'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import CloseIcon from '@material-ui/icons/Close'
import GitHubIcon from '@material-ui/icons/GitHub'
import MenuIcon from '@material-ui/icons/Menu'
import { observer } from 'mobx-react'
import React from 'react'
import Helmet, { HelmetProps } from 'react-helmet'

import store, { persist, storeContext } from '../store'
import GridDivider from './GridDivider'
import Menu from './Menu'

const titleTemplate = (t: string) => `${t} | Tools`

const lightTheme = createMuiTheme({
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

const darkTheme = createMuiTheme({
  typography: {
    fontFamily: 'Nunito, "LiHei Pro", "Microsoft JhengHei", sans-serif',
    fontSize: 14,
  },
  palette: {
    primary: {
      main: '#444',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ddd',
      contrastText: '#333',
    },
    text: {
      primary: '#eee',
    },
    background: {
      paper: '#222',
      default: '#222',
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

export const withLayout = (Component: () => JSX.Element, { title = 'Home Page', disableHeader = false, theme, ...props }: Props) => {
  const Layout = () => {
    const { main, menuButton } = useStyles()
    const { config } = React.useContext(storeContext)
  
    const [open, setOpen] = React.useState(false)
    const [ready, setReady] = React.useState(false)
    const [filter, setFilter] = React.useState('')
  
    React.useEffect(() => {
      document.title = titleTemplate(title)
    }, [])
  
    React.useEffect(() => {
      persist().then(() => {
        setReady(true)
      })
    }, [])
  
    const openGithub = React.useCallback(() => {
      if (typeof window === 'undefined') { return }
      window.open('https://github.com/ericchanky/ericchanky.github.io', '__blank')
    }, [])
  
    const selectedTheme = React.useMemo(() => {
      if (theme) { return theme }
      return config.theme
    }, [config.theme])
  
    return (
      <storeContext.Provider value={store}>
        <ThemeProvider theme={selectedTheme === 'dark' ? darkTheme : lightTheme }>
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
          <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
          >
            <AppBar elevation={0} color="inherit" position="relative">
              <Toolbar>
                <TextField
                  placeholder="Search..."
                  value={filter}
                  onChange={(evt) => setFilter(evt.target.value)}
                />
                <GridDivider />
                <IconButton color="inherit" onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <Menu filter={filter} />
            </DialogContent>
          </Dialog>
        </ThemeProvider>
      </storeContext.Provider>
    )
  }

  return observer(Layout)
}
