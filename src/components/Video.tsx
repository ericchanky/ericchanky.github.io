import { Box, makeStyles } from '@material-ui/core'
import { observer } from 'mobx-react'
import React from 'react'

import { storeContext } from '../store'
import { AuthProps } from './withAuth'

interface Props extends AuthProps {}

const PRELOAD = 3

const useStyles = makeStyles(() => ({
  container: {
    width: '100vw',
    height: '100vh',
  },
  player: {
    width: '100%',
    height: '100%',
  },
}))

const Video = ({ password }: Props) => {
  const videoRef = React.createRef<HTMLVideoElement>()
  const { image } = React.useContext(storeContext)
  const { first } = image

  const { container, player } = useStyles()

  const reset = React.useCallback(() => {
    image.init({ password, preload: PRELOAD, title: 'GYM', subfix: 'dv' })
  }, [image, password])

  React.useEffect(() => {
    reset()
  }, [reset])

  React.useEffect(() => {
    if (!videoRef.current) { return }
    videoRef.current.load()
  }, [videoRef])

  const next = React.useCallback(() => {
    image.next()
  }, [image])

  return (
    <Box className={container}>
      <video
        ref={videoRef}
        className={player}
        playsInline
        controls={false}
        onEnded={next}
        autoPlay
        muted
      >
        {first && first.data && <source src={first.data} type={first.mimeType} />}
      </video>
    </Box>
  )
}

export default observer(Video)
