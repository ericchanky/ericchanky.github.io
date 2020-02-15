import { Box, makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'

const ImageBoxStyles = makeStyles(() => ({
  src: ({ src }: { src: string }) => ({
    backgroundImage: `url(${src})`,
  }),
}))

const ImageBox = ({ src, className }: { src?: string | null, className?: string }) => {
  if (!src) { return null }

  const classes = ImageBoxStyles({ src })

  return (
    <Box className={classNames(className, classes.src)} />
  )
}

export default React.memo(ImageBox)
