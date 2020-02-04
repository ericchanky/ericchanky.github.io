import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CachedIcon from '@material-ui/icons/Cached'
import RemoveIcon from '@material-ui/icons/Remove'
import SettingsIcon from '@material-ui/icons/Settings'
import { observer } from 'mobx-react'
import React from 'react'

import { AuthProps, withAuth } from '../components/Auth'
import Awake from '../components/Awake'
import Image from '../components/Image'
import { withLayout } from '../components/Layout'
import Video from '../components/Video'
import { storeContext } from '../store'
import { Actions, emitter } from '../utils/event'

interface Props extends AuthProps {}

const useStyles = makeStyles({
  drawer: {
    width: 280,
  },
  settingButton: {
    position: 'fixed',
    top: 0,
    right: 0,
    color: 'rgba(255, 255, 255, 0.1)',
  },
})

const Wallpaper = ({ password }: Props) => {
  const { image } = React.useContext(storeContext)
  const { drawer, settingButton } = useStyles()

  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState<'girl' | 'gym'>('girl')
  const [config, setConfig] = React.useState({
    interval: 0,
  })

  React.useEffect(() => {
    if (config.interval === 0) { return }
    const t = setInterval(image.next, config.interval * 1000)
    return () => clearInterval(t)
  }, [config.interval, image.next])

  const onTap = React.useCallback((evt: HammerInput) => {
    if (evt.center.x < 130) {
      image.next()
    }
  }, [image])

  React.useEffect(() => {
    emitter.on(Actions.TAP, onTap)
    return () => {
      emitter.off(Actions.TAP, onTap)
    }
  })

  React.useEffect(() => {
    emitter.on(Actions.SWIPE_LEFT, image.next)
    emitter.on(Actions.SWIPE_RIGHT, image.next)

    return () => {
      emitter.off(Actions.SWIPE_LEFT, image.next)
      emitter.off(Actions.SWIPE_RIGHT, image.next)
    }
  }, [image.next])

  const changeType = React.useCallback((t: typeof type) => {
    setType(t)
    image.list.replace([])
  }, [image.list, type])

  return (
    <Box>
      <Awake />
      {type === 'girl' && <Image password={password} />}
      {type === 'gym' && <Video password={password} />}
      <IconButton
        color="secondary"
        className={settingButton}
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
      >
        <Box className={drawer}>
          <List>
            <ListItem>
              <ListItemText
                primary={image.list.length}
                secondary="Total Image"
              />
              <ListItemIcon>
                <IconButton
                  color="secondary"
                  onClick={() => location.reload(true)}
                >
                  <CachedIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <IconButton
                  color="secondary"
                  onClick={() => setConfig({ ...config, interval: config.interval + 1 })}
                >
                  <AddIcon />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={config.interval}
                secondary="Automation Interval"
              />
              <ListItemIcon>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    if (config.interval === 0) { return }
                    setConfig({ ...config, interval: config.interval - 1 })
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemText primary="Girls" />
              <ListItemIcon>
                <IconButton
                  color="secondary"
                  onClick={() => changeType('girl')}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemText primary="GYM" />
              <ListItemIcon>
                <IconButton
                  color="secondary"
                  onClick={() => changeType('gym')}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default withLayout(withAuth(observer(Wallpaper), {
  required: true,
}), {
  title: 'Wallpaper',
  disableHeader: true,
  theme: 'dark',
})
