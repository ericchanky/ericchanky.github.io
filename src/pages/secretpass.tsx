import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core'
import Clear from '@material-ui/icons/Clear'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useObserver } from 'mobx-react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useClipboard } from '../components/hooks'
import Page from '../components/Layout/Page'
import { CodePad } from '../components/Layout/withAuth'
import { withLayout } from '../components/Layout/withLayout'
import { storeContext } from '../store'
import { generateSalt, tokenize } from '../utils/tokenize'

const useStyles = makeStyles({
  fullHeihgt: {
    height: '100%',
  },
})

const SecretPass = () => {
  const classes = useStyles()
  const [visible, setVisible] = useState(false)
  const [password, setPasssword] = useState('')
  const [context, setContext] = useState('')
  const { copy, clear } = useClipboard()
  const { secretpass } = useContext(storeContext)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [passcode, setPasscode] = useState('')

  useEffect(() => {
    if (passcode.length < 6) { return }
    secretpass.getSecrets(passcode)
  }, [passcode, secretpass])

  useEffect(() => {
    const t = setTimeout(() => {
      if (password != '') {
        setPasssword('')
      }
    }, 3 * 60 * 1000)
    return () => clearTimeout(t)
  }, [password])

  const token = useMemo(() => {
    if (!password) { return '' }
    const secret = secretpass.secret ? secretpass.secret.secret : undefined
    return tokenize(password.padEnd(8, ' '), context, secret)
  }, [context, password, secretpass.secret])

  return useObserver(() => (
    <Page>
      <Grid container spacing={2} alignContent="center" className={classes.fullHeihgt}>
        <Grid container item xs={12} justify="center">
          <Typography variant="h4">Secret Pass</Typography>
        </Grid>
        <Grid container item xs={12} spacing={1} justify="center">
          {secretpass.secrets.map((secret) => {
            const selected = secretpass.secret && secret.id === secretpass.secret.id
            return (
              <Grid key={secret.id} item>
                <Chip
                  clickable
                  label={secret.name}
                  variant={selected ? 'default' : 'outlined'}
                  onClick={() => {
                    if (selected) {
                      secretpass.selected = ''
                    } else {
                      secretpass.selected = secret.id
                    }
                  }}
                />
              </Grid>
            )
          })}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="url"
            autoCapitalize="none"
            variant="outlined"
            size='small'
            label="Context"
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
            label="Passcode"
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
            variant="outlined"
            size="small"
            label="Secret Code"
            value={token}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setContext('')
                      setPasssword('')
                    }}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid container item xs={12} justify="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                copy(token)
                setContext('')
                setPasssword('')
              }}
            >
              Copy
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setOpen(true)}>
              Add Secret
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={clear}>
              Clear Clipboard
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate secret</DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Grid item xs={12}>
              {passcode.length < 6 && (
                <CodePad
                  theme="dark"
                  password={passcode}
                  setPassword={setPasscode}
                />
              )}
              {passcode.length >= 6 && (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="name"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={async () => {
              await secretpass.createSecret({
                id: uuid(),
                secret: generateSalt(),
                name,
                passcode,
              })
              setName('')
              setOpen(false)
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  ))
}

export default withLayout(SecretPass, {
  title: 'Secret Pass',
  disableHeader: true,
  theme: 'dark',
})
