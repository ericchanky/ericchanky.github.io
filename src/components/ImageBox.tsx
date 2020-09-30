import { Box, makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'

interface Props {
  className: string
  src?: string | null
  style?: React.CSSProperties
}

const useStyles = makeStyles({
  background: ({ src }: Pick<Props, 'src'>) => {
    if (!src) { return {} }
    return {
      backgroundImage: `url(${src})`,
    }
  },
})

const ImageBox = ({ className, src, ...props }: Props) => {
  const { background } = useStyles({ src })

  return (
    <Box className={classNames(className, background)} {...props} />
  )
}

export default React.memo(ImageBox)
