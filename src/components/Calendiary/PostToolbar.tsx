import 'react-infinite-calendar/styles.css'

import { ButtonBase, ButtonGroup, Dialog, DialogContent, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import { observer } from 'mobx-react'
import React from 'react'
import { ToolbarProps } from 'react-big-calendar'
import InfiniteCalendar from 'react-infinite-calendar'

import { storeContext } from '../../store'
import GridDivider from '../GridDivider'
import { useMobile, useScreen } from '../hooks'
import { CodePad } from '../Layout/withAuth'
import ToolbarIconButton from './ToolbarIconButton'

const PostToolbar = ({ label, date, view, onNavigate }: ToolbarProps) => {
  const { calendiary, image } = React.useContext(storeContext)
  const [open, setOpen] = React.useState(false)
  const [openCodePad, setOpenCodePad] = React.useState(false)
  const [password, setPassword] = React.useState('')

  const isMobile = useMobile()
  const { width, height } = useScreen()

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

  React.useEffect(() => {
    if (calendiary.wallpaperCode === '') {
      image.wallpaperList.replace([])
    }
  }, [calendiary.wallpaperCode, image])

  return (
    <Toolbar>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <ButtonGroup>
            <ToolbarIconButton
              color="secondary"
              onClick={() => onNavigate('PREV')}
            >
              <KeyboardArrowLeftIcon />
            </ToolbarIconButton>
            <ToolbarIconButton
              color="secondary"
              onClick={() => onNavigate('NEXT')}
            >
              <KeyboardArrowRightIcon />
            </ToolbarIconButton>
          </ButtonGroup>
        </Grid>
        {view !== 'agenda' && (
          <Grid item>
            <ButtonBase
              onClick={() => setOpen(true)}
            >
              <Typography color="secondary" variant="h5">{label}</Typography>
            </ButtonBase>
          </Grid>
        )}
        <GridDivider />
        {view === 'agenda' && (
          <IconButton
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <CalendarTodayIcon />
          </IconButton>
        )}
        <IconButton
          color="inherit"
          onClick={() => calendiary.set({ visibility: !calendiary.visibility })}
        >
          {calendiary.visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            if (calendiary.wallpaperCode) {
              return calendiary.set({ wallpaperCode: '' })
            }
            return setOpenCodePad(true)
          }}
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

export default observer(PostToolbar)
