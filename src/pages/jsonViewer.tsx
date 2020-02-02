import { CardContent, CircularProgress, TextField, Typography } from '@material-ui/core'
import React from 'react'

import { withLayout } from '../components/Layout'

const ReactJson = React.lazy(() => import('react-json-view'))

const JSONViewer = () => {
  const [json, setJSON] = React.useState('')

  const isValidJSON = React.useMemo(() => {
    try {
      JSON.parse(json)
      return true
    } catch (err) {
      return false
    }
  }, [json])

  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={5}
        label="Paste JSON here"
        variant="outlined"
        value={json}
        onChange={(evt) => setJSON(evt.target.value)}
      />
      <CardContent>
        {!isValidJSON && json && <Typography color="error">Invalid JSON</Typography>}
        {isValidJSON && (
          <React.Suspense fallback={<CircularProgress color="secondary" />}>
            <ReactJson src={JSON.parse(json)} />
          </React.Suspense>
        )}
      </CardContent>
    </>
  )
}

export default withLayout(JSONViewer, {
  title: 'JSON Viewer',
})
