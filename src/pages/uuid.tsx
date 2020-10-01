import { Box, Grid, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import SaveIcon from '@material-ui/icons/Save'
import React from 'react'
import uuid from 'uuid/v4'

import { withLayout } from '../components/withLayout'

const useStyles = makeStyles({
  input: {
    textAlign: 'center',
  },
})

const UUID = () => {
  const { input } = useStyles()
  const [value, setValue] = React.useState(uuid())

  const ref = React.createRef<HTMLInputElement>()

  const copy = React.useCallback((evt: React.FocusEvent<HTMLInputElement>) => {
    evt.target.select()
    document.execCommand('copy')
  }, [])

  return (
    <Box>
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={8}>
          <TextField
            fullWidth
            inputRef={ref}
            variant="outlined"
            value={value}
            onFocus={copy}
            InputProps={{
              readOnly: true,
              classes: { input },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      if (!ref.current) { return }
                      ref.current.focus()
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={() => setValue(uuid())}
                  >
                    <ReplayIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withLayout(UUID, {
  title: 'Generate UUID',
})
