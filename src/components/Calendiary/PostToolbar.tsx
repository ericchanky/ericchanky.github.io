import { ButtonGroup, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import React from 'react'
import { ToolbarProps } from 'react-big-calendar'

const PostToolbar = ({ label, date, onNavigate }: ToolbarProps) => {
  return (
    <Toolbar>
      <Grid container alignItems="center">
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
          <Typography color="secondary" variant="h5">{label}</Typography>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default PostToolbar
