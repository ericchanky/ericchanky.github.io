import { makeStyles } from '@material-ui/core'
import React from 'react'

import Video from '../images/video.backup.mp4'

const useStyles = makeStyles({
  videoStyle: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
})

interface Props {
  disabled?: boolean
}

/**
 * A hack to keep screen always on
 */
const Awake = ({ disabled = false }: Props) => {
  const { videoStyle } = useStyles()
  const [video, setVideo] = React.useState(Video)

  const videoRef = React.createRef<HTMLVideoElement>()

  React.useEffect(() => {
    if (!videoRef.current) { return }
    videoRef.current.load()
  }, [videoRef])

  const toggle = React.useCallback(() => {
    if (disabled) { return }
    const t = setTimeout(setVideo, 5000, Video)
    setVideo('')

    return () => clearTimeout(t)
  }, [disabled])

  return (
    <video
      className={videoStyle}
      ref={videoRef}
      playsInline
      autoPlay
      muted
      width={1}
      height={1}
      onEnded={toggle}
    >
      {video && <source src={video} type="video/mp4" />}
    </video>
  )
}

export default Awake
