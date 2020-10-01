import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useMemo, useRef, useState } from 'react'

import Page from '../components/Layout/Page'
import { withLayout } from '../components/Layout/withLayout'
import { tokenize } from '../utils/tokenize'

const useStyles = makeStyles({
  fullHeihgt: {
    height: '100%',
  },
  center: {
    textAlign: 'center',
  },
})

const SecretPass = () => {
  const classes = useStyles()
  const [password, setPasssword] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  const token = useMemo(() => {
    if (!password) { return '' }
    return tokenize(password)
  }, [password])

  return (
    <Page>
      <Grid container spacing={2} alignContent="center" className={classes.fullHeihgt}>
        <Grid item xs={12} className={classes.center}>
          <Typography variant="h4">Secret Pass</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="password"
            value={password}
            onChange={(evt) => setPasssword(evt.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            aria-readonly
            inputRef={ref}
            variant="outlined"
            size="small"
            value={token}
          />
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            onClick={() => {
              if (!ref.current) return
              ref.current.select()
              document.execCommand('copy')
              setPasssword('')
            }}
          >
            Copy
          </Button>
        </Grid>
      </Grid>
    </Page>
  )
}

export default withLayout(SecretPass, {
  title: 'Secret Pass',
  disableHeader: true,
  theme: 'dark',
})
