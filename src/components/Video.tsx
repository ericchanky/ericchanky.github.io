import { Box, makeStyles } from '@material-ui/core'
import Axios from 'axios'
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
  const { first, second } = image

  const fetchVideo = React.useCallback(async (src: string) => {
    const url = encodeURIComponent(src)
    const res = await Axios.get(`https://dzway.herokuapp.com/video?src=${url}`, {
      responseType: 'arraybuffer',
    })
    const encoded = Buffer.from(res.data, 'binary').toString('base64')
    return `data:video/mp4;base64,${encoded}`
  }, [])

  const fetchFirstVideo = React.useCallback(async () => {
    if (!first || first.data != null) { return }
    const s = await fetchVideo(first.url)
    image.setItem(first.id, s)
  }, [fetchVideo, first, image])

  React.useEffect(() => {
    fetchFirstVideo()
  }, [fetchFirstVideo])

  const fetchNextVideo = React.useCallback(async () => {
    if (!second || second.data != null) { return }
    const s = await fetchVideo(second.url)
    image.setItem(second.id, s)
  }, [fetchVideo, image, second])

  React.useEffect(() => {
    fetchNextVideo()
  }, [fetchNextVideo])

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
        {first && first.data && <source src={first.data} type="video/mp4" />}
      </video>
    </Box>
  )
}

export default observer(Video)
