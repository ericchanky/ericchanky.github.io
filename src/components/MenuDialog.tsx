import { AppBar, Dialog, DialogContent, DialogProps, IconButton, Link, makeStyles, TextField, Toolbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

import { version } from '../../package.json'
import GridDivider from './GridDivider'
import Menu from './Menu'

interface Props {
  dialogProps: DialogProps
  onClose(): void
}

const useStyles = makeStyles(() => ({
  footer: {
    top: 'auto',
    bottom: 0,
  },
}))

const MenuDialog = ({ dialogProps, onClose }: Props) => {
  const { footer } = useStyles()
  const [filter, setFilter] = React.useState('')
  
  return (
    <Dialog
      fullScreen
      {...dialogProps}
      onClose={onClose}
    >
      <AppBar elevation={0} color="inherit" position="relative">
        <Toolbar>
          <TextField
            placeholder="Search..."
            value={filter}
            onChange={(evt) => setFilter(evt.target.value)}
          />
          <GridDivider />
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Menu filter={filter} />
      </DialogContent>
      <AppBar position="fixed" className={footer} elevation={0} color="inherit">
        <Toolbar>
          <Link
            component="a"
            color="textSecondary"
            variant="caption"
            onClick={(evt: any) => {
              evt.preventDefault()
              location.reload(true)
            }}
          >
            Version: {version}
          </Link>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}

export default MenuDialog
