import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  divider: {
    flex: '1 1 auto',
  },
}))

const GridDivider = () => {
  const { divider } = useStyles()

  return (
    <Box className={divider} />
  )
}

export default React.memo(GridDivider)
