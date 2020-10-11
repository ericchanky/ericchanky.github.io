import { Button, Grid, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React, { useMemo, useRef, useState } from 'react'

import { useCopy } from '../components/hooks/useCopy'
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
  const [visible, setVisible] = useState(false)
  const [password, setPasssword] = useState('')
  const [context, setContext] = useState('')
  const [ref, copy] = useCopy()

  const token = useMemo(() => {
    if (!password) { return '' }
    return tokenize(password, context)
  }, [context, password])

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
            size='small'
            placeholder="Context"
            value={context}
            onChange={(evt) => setContext(evt.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type={visible ? 'text' : 'password'}
            placeholder="Passcode"
            value={password}
            onChange={(evt) => setPasssword(evt.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="secondary"
                    onClick={() => setVisible((v) => !v)}
                  >
                    {visible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            aria-readonly
            inputRef={ref}
            variant="outlined"
            size="small"
            placeholder="Secret Code"
            value={token}
          />
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            onClick={() => {
              copy()
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
