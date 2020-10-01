import { CssBaseline, Grid, Typography } from '@material-ui/core'
import React from 'react'

const Page404 = () => {
  return (
    <>
      <CssBaseline />
      <Grid container justify="center" alignItems='center' style={{ height: '100vh' }}>
        <Grid item>
          <Typography variant="h2">Lost?</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Page404
