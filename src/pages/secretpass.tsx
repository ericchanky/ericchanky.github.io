import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core'
import Clear from '@material-ui/icons/Clear'
import Delete from '@material-ui/icons/Delete'
import History from '@material-ui/icons/History'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useObserver } from 'mobx-react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useEncryptedData } from '../components/aes'
import { useClipboard } from '../components/hooks'
import Page from '../components/Layout/Page'
import { withAuth } from '../components/Layout/withAuth'
import { withLayout } from '../components/Layout/withLayout'
import { storeContext } from '../store'
import { Suggestion } from '../store/secretpass'
import { generateSalt, tokenize } from '../utils/tokenize'

const useStyles = makeStyles({
  fullHeihgt: {
    height: '100%',
  },
})

const SecretPass = ({ password: passcode }: { password: string }) => {
  const classes = useStyles()
  const [visible, setVisible] = useState(false)
  const [password, setPasssword] = useState('')
  const [context, setContext] = useState('')
  const { copy, clear } = useClipboard()
  const { secretpass } = useContext(storeContext)
  const [open, setOpen] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [name, setName] = useState('')
  const suggestions = useEncryptedData<Suggestion[]>(secretpass.data, passcode, [])

  useEffect(() => {
    if (secretpass.secrets.length === 0) { return }
    secretpass.getSecrets(passcode)
  }, [passcode, secretpass])

  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     if (password != '') {
  //       setPasssword('')
  //     }
  //   }, 3 * 60 * 1000)
  //   return () => clearTimeout(t)
  // }, [password])

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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="secondary"
                    onClick={() => setOpenHistory(true)}
                  >
                    <History />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                const suggestionName = window.prompt('Enter a name:')
                if (!suggestionName) { return }
                secretpass.setSuggestions(suggestions.concat({
                  name: suggestionName,
                  context,
                  password,
                  version: secretpass.selected,
                }), passcode)
              }}
            >
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setOpen(true)}>
              Add Secret
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={clear}>
              Flush
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen
      >
        <DialogTitle>Generate secret</DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="name"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
              />
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
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openHistory}
        onClose={() => setOpenHistory(false)}
      >
        <List disablePadding>
          {suggestions.map((suggestion) => {
            return (
              <ListItem
                key={suggestion.name}
                button
                onClick={() => {
                  setContext(suggestion.context)
                  setPasssword(suggestion.password)
                  setOpenHistory(false)
                }}
              >
                <ListItemText
                  primary={suggestion.name}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      if (window.confirm(`Remove ${suggestion.name}`)) {
                        secretpass.setSuggestions(
                          suggestions.filter((s) => s.name !== suggestion.name),
                          passcode,
                        )
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </Dialog>
    </Page>
  ))
}

export default withLayout(withAuth(SecretPass, { required: true, passthrough: true }), {
  title: 'Secret Pass',
  disableHeader: true,
  theme: 'dark',
})
