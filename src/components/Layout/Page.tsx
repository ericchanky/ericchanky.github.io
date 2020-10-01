import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
})

const Page = ({ children }: React.PropsWithChildren<{}>) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      {children}
    </Box>
  )
}

export default Page
