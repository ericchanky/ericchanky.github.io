import { Box, makeStyles } from '@material-ui/core'
import { observer } from 'mobx-react'
import React from 'react'

import { storeContext } from '../store'
import { AuthProps } from './Auth'

interface Props extends AuthProps {}

const PRELOAD = 2

const useStyles = makeStyles(() => ({
  container: {
    width: '100vw',
    height: '100vh',
  },
}))

const Video = ({ password }: Props) => {
  const videoRef = React.createRef<HTMLVideoElement>()
  const { image } = React.useContext(storeContext)
  const { first } = image

  const { container } = useStyles()

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
        style={{ height: '100%', width: '100%' }}
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
