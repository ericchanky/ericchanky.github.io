import { Button, CardActions, TextField } from '@material-ui/core'
import React from 'react'

import { withLayout } from '../components/Layout'

const EncodeURL = () => {
  const [url, setURL] = React.useState('')

  const onEncode = React.useCallback(() => {
    if (typeof window === 'undefined') { return }

    if (/^https?/.test(url)) {
      setURL(encodeURI(url))
    } else {
      setURL(encodeURIComponent(url))
    }
  }, [url])

  const onDecode = React.useCallback(() => {
    if (typeof window === 'undefined') { return }
    
    if (/^https?/.test(url)) {
      setURL(decodeURI(url))
    } else {
      setURL(decodeURIComponent(url))
    }
  }, [url])

  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={5}
        variant="outlined"
        value={url}
        onChange={(evt) => setURL(evt.target.value)}
      />
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={onEncode}
        >
          Encode
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={onDecode}
        >
          Decode
        </Button>
      </CardActions>
    </>
  )
}

export default withLayout(EncodeURL, {
  title: 'Encode / Decode URL',
})
