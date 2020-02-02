import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import Hammer from 'react-hammerjs'

import { AuthProps, withAuth } from '../components/Auth'
import { withLayout } from '../components/Layout'
import useImages from '../components/useImages'

interface Props extends AuthProps {}

interface StyleProps {
  image: string
  background: string
  offset: number
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
  },
  hidden: {
    display: 'none',
  },
  image: ({ image }: StyleProps) => ({
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: image && `url(${image})`,
    transition: theme.transitions.create(['background'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
  }),
  background: ({ offset, background }: StyleProps) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundPosition: `${offset}px center`,
    backgroundImage: background && `url(${background})`,
    transition: theme.transitions.create(['background'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
      delay: 100,
    }),
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(8, 8, 8, 0.92)',
    },
  }),
}))

const PRELOAD = 5

const Wallpaper = ({ password }: Props) => {
  const theme = useTheme()
  const isLargerThanMD = useMediaQuery(theme.breakpoints.up('md'))

  const [list, setList] = useImages(password, PRELOAD)
  const selectedImage = React.useMemo(() => list.find((_, i) => i === 0), [list])
  const backgroundImage = React.useMemo(() => list.find((_, i) => i === 1), [list])

  const next = React.useCallback(() => {
    setList((l) => l.slice(1))
  }, [setList])

  const offset = React.useMemo(() => {
    if (!backgroundImage) { return 0 }
    return backgroundImage.width * 0.2 * -1
  }, [backgroundImage])

  const { container, hidden, image, background } = useStyles({
    offset,
    image: selectedImage ? selectedImage.url : '',
    background: backgroundImage ? backgroundImage.url : '',
  })

  return (
    <Hammer
      direction="DIRECTION_ALL"
      onSwipe={(evt) => {
        // if (scale > 1) { return }
        if (evt.direction === 2 || evt.direction === 4) {
          // direction left or right
          next()
        }
        // if (evt.direction === 16) {
        //   // direction down
        //   setOptions({ ...options, openMenu: true })
        // }
      }}
    >
      <Box className={container}>
        {list.slice(0, PRELOAD).map((img) => {
          return <img key={img.id} className={hidden} src={img.url} />
        })}
        {backgroundImage && isLargerThanMD && (
          <Box className={background} />
        )}
        {selectedImage && (
          <Box className={image} />
        )}
      </Box>
    </Hammer>
  )
}

export default withLayout(withAuth(Wallpaper, {
  required: true,
}), {
  title: 'Wallpaper',
  disableHeader: true,
  theme: 'dark',
})
