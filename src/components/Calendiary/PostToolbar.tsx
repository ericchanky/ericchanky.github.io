import 'react-infinite-calendar/styles.css'

import { ButtonBase, ButtonGroup, Dialog, DialogContent, Grid, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import React from 'react'
import { ToolbarProps } from 'react-big-calendar'
import InfiniteCalendar from 'react-infinite-calendar'

import { storeContext } from '../../store'
import { CodePad } from '../Auth'
import GridDivider from '../GridDivider'
import useDimension from '../useDimension'

const PostToolbar = ({ label, date, onNavigate }: ToolbarProps) => {
  const { calendiary } = React.useContext(storeContext)
  const [open, setOpen] = React.useState(false)
  const [openCodePad, setOpenCodePad] = React.useState(false)
  const [password, setPassword] = React.useState('')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { width, height } = useDimension()

  React.useEffect(() => {
    if (password === '*') {
      setPassword('')
      setOpenCodePad(false)
    }

    if (password === '000') {
      calendiary.set({ wallpaperCode: '' })
      setPassword('')
      setOpenCodePad(false)
    }

    if (password.length === 6) {
      calendiary.set({ wallpaperCode: password })
      setPassword('')
      setOpenCodePad(false)
    }
  }, [calendiary, password])

  return (
    <Toolbar>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <ButtonGroup>
            <IconButton
              color="secondary"
              onClick={() => onNavigate('PREV', date)}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => onNavigate('NEXT', date)}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonBase
            onClick={() => setOpen(true)}
          >
            <Typography color="secondary" variant="h5">{label}</Typography>
          </ButtonBase>
        </Grid>
        <GridDivider />
        <IconButton
          color="inherit"
          onClick={() => setOpenCodePad(true)}
        >
          <WallpaperIcon />
        </IconButton>
      </Grid>
      <Dialog
        fullScreen={isMobile}
        open={open}
        onClose={() => setOpen(false)}
      >
        <InfiniteCalendar
          autoFocus
          width={isMobile ? width : 400}
          height={isMobile ? height : 600}
          selected={date}
          onSelect={(d: Date) => {
            onNavigate('DATE', d)
            setOpen(false)
          }}
        />
      </Dialog>
      <Dialog
        fullScreen={isMobile}
        open={openCodePad}
        onClose={() => setOpenCodePad(false)}
      >
        <DialogContent>
          <CodePad
            theme={'dark'}
            password={password}
            setPassword={setPassword}
          />
        </DialogContent>
      </Dialog>
    </Toolbar>
  )
}

export default PostToolbar
