import 'react-infinite-calendar/styles.css'

import { ButtonBase, ButtonGroup, Dialog, Grid, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import React from 'react'
import { ToolbarProps } from 'react-big-calendar'
import InfiniteCalendar from 'react-infinite-calendar'

import useDimension from '../useDimension'

const PostToolbar = ({ label, date, onNavigate }: ToolbarProps) => {
  const [open, setOpen] = React.useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { width, height } = useDimension()

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
    </Toolbar>
  )
}

export default PostToolbar
