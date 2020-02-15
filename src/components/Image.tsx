import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'

import { storeContext } from '../store'
import { Actions, emitter } from '../utils/event'
import { AuthProps } from './Auth'
import ImageBox from './ImageBox'

interface Props extends AuthProps {
  hideBackground?: boolean
  hideForeground?: boolean
}

interface StyleProps {
  offset: number
  transform: string
}

const useStyles = makeStyles((theme) => ({
  '@keyframes backgroundScale': {
    '0%': {
      transform: 'scale(1)',
      animationTimingFunction: 'ease-in',
    },
    '65%': {
      transform: 'scale(1.15)',
      animationTimingFunction: 'ease-out',
    },
  },
  animate: {
    transform: 'scale(1)',
    animationName: '$backgroundScale',
    animationDuration: '8s',
    animationIterationCount: 'infinite',
  },
  container: {
    width: '100vw',
    height: '100vh',
  },
  foreground: ({ transform }: StyleProps) => ({
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    transform,
    transition: theme.transitions.create(['background'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
  }),
  background: ({ offset }: StyleProps) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundPosition: `${offset}px center`,
    transition: theme.transitions.create(['background'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
      delay: 250,
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

const Image = ({ password, hideBackground = false, hideForeground = false }: Props) => {
  const theme = useTheme()
  const isLargerThanMD = useMediaQuery(theme.breakpoints.up('md'))
  const { image } = React.useContext(storeContext)
  const { first, second } = image

  const [attr, setAttr] = React.useState({
    x: 0, y: 0, ox: 0, oy: 0,
    scale: 1, oScale: 1,
  })

  const offset = React.useMemo(() => {
    if (!second) { return 0 }
    return second.width * 0.2 * -1
  }, [second])

  const transform = React.useMemo(() => {
    return `scale(${attr.scale}) translate(${attr.x}px, ${attr.y}px)`
  }, [attr.scale, attr.x, attr.y])

  const onPan = React.useCallback((evt: HammerInput) => {
    if (attr.scale > 1) {
      setAttr((a) => ({ ...a, x: a.ox + evt.deltaX / a.scale, y: a.oy + evt.deltaY / a.scale }))
    }
  }, [attr.scale])

  React.useEffect(() => {
    emitter.on(Actions.PAN, onPan)
    return () => {
      emitter.off(Actions.PAN, onPan)
    }
  }, [onPan])

  const onPanEnd = React.useCallback(() => {
    if (attr.scale > 1) {
      setAttr((a) => ({ ...a, ox: a.x, oy: a.y }))
    }
  }, [attr.scale])

  React.useEffect(() => {
    emitter.on(Actions.PAN_END, onPanEnd)
    return () => {
      emitter.off(Actions.PAN_END, onPanEnd)
    }
  }, [onPanEnd])

  const onPinch = React.useCallback((evt: HammerInput) => {
    setAttr((a) => ({
      ...a,
      x: a.ox + evt.deltaX / a.scale, y: a.oy + evt.deltaY / a.scale,
      scale: Math.min(Math.max(1, a.oScale * evt.scale), 3),
    }))
  }, [])

  React.useEffect(() => {
    emitter.on(Actions.PINCH, onPinch)
    return () => {
      emitter.off(Actions.PINCH, onPinch)
    }
  }, [onPinch])

  const onPinchEnd = React.useCallback(() => {
    setAttr((a) => ({ ...a, oScale: attr.scale, ox: a.x, oy: a.y }))
  }, [attr.scale])

  React.useEffect(() => {
    emitter.on(Actions.PINCH_END, onPinchEnd)
    return () => {
      emitter.off(Actions.PINCH_END, onPinchEnd)
    }
  }, [onPinchEnd])

  const resetAttr = React.useCallback(() => {
    setAttr({ oScale: 1, scale: 1, x: 0, y: 0, ox: 0, oy: 0 })
  }, [])

  const onDoubleTap = React.useCallback(() => {
    if (!first) { return }

    if (attr.scale > 1 || attr.oScale > 1 || attr.x !== 0 || attr.y !== 0 || attr.ox !== 0 || attr.oy !== 0) {
      resetAttr()
      return
    }

    const widthRatio = first.width / window.innerWidth
    const heightRatio = first.height / window.innerHeight

    if (widthRatio > heightRatio) {
      const currentHeight = first.height / widthRatio

      const scale = window.innerHeight / currentHeight
      setAttr((a) => ({ ...a, scale, oScale: scale }))
    } else {
      const currentWidth = first.width/ heightRatio

      const scale = window.innerWidth / currentWidth
      setAttr((a) => ({ ...a, scale, oScale: scale }))
    }
  }, [attr.oScale, attr.ox, attr.oy, attr.scale, attr.x, attr.y, first, resetAttr])

  React.useEffect(() => {
    emitter.on(Actions.DOUBLE_TAP, onDoubleTap)
    return () => {
      emitter.off(Actions.DOUBLE_TAP, onDoubleTap)
    }
  }, [onDoubleTap, resetAttr])

  const { container, animate, foreground, background } = useStyles({
    offset,
    transform,
  })

  React.useEffect(() => {
    resetAttr()
  }, [first, resetAttr])

  const reset = React.useCallback(() => {
    image.init({ password, preload: PRELOAD })
  }, [image, password])

  React.useEffect(() => {
    reset()
  }, [reset])

  return (
    <Box className={container}>
      {second && isLargerThanMD && !hideBackground && (
        <ImageBox className={classNames(background, animate)} src={second.data} />
      )}
      {first && !hideForeground && (
        <ImageBox className={foreground} src={first.data} />
      )}
    </Box>
  )
}

export default observer(Image)
