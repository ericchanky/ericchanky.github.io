import { Box, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import csv from 'csvtojson'
import { format, isBefore } from 'date-fns'
import { addHours } from 'date-fns/esm'
import { observer } from 'mobx-react'
import qs from 'qs'
import React from 'react'

import { withLayout } from '../components/Layout/withLayout'
import { storeContext } from '../store'

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    color: 'white',
  },
  phraseContainer: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-60%)',
    textAlign: 'center',
    margin: '0 8rem',
  },
  phrasePrimary: {
    fontSize: '2.5rem',
  },
  phraseSecondary: {
    marginTop: '2rem',
    textAlign: 'right',
  },
  time: {
    position: 'absolute',
    bottom: theme.spacing(2),
    width: '100%',
    textAlign: 'center',
  },
  timeFont: {
    fontFamily: 'Fira Mono',
  },
}))

const source = `https://dzway.herokuapp.com/proxy?src=${encodeURIComponent('https://docs.google.com/spreadsheets/d/e/2PACX-1vTfSMdib9NVMRR0UxeFCg9jM_nLKxFpGwur-NjjdNQlpqZXerymjiNzQm_1Nu9P3bvnc-WzN51n4o8B/pub?gid=0&single=true&output=tsv')}`

const Phrase = () => {
  const { main, phrasePrimary, phraseSecondary, phraseContainer, time, timeFont } = useStyles()
  const { phrase } = React.useContext(storeContext)

  const [now, setNow] = React.useState(new Date)
  const [config, setConfig] = React.useState({ raw: false })

  const fetch = React.useCallback(async () => {
    if (isBefore(new Date, phrase.nextUpdate)) { return }

    const res = await axios.get(source)
    csv({ headers: ['phrase', 'author'], delimiter: '\t' })
      .fromString(res.data)
      .then((data) => {
        phrase.set({
          list: data as unknown as typeof phrase['list'], nextUpdate: addHours(new Date, 6),
          nextPhrase: new Date,
        })
      })
  }, [phrase])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date), 1000)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    // toggle auto mode
    const query = qs.parse(location.search.substring(1))
    if (query.auto) {
      setConfig((c) => ({ ...c, raw: true }))
    }
  }, [])

  return (
    <Box className={main}>
      <Box className={phraseContainer}>
        {!phrase.item && <CircularProgress color="primary" />}
        <Typography className={phrasePrimary}>{phrase.item && phrase.item.phrase}</Typography>
        {phrase.item && phrase.item.author && (
          <Typography className={phraseSecondary}>— {phrase.item.author}</Typography>
        )}
      </Box>
      {!config.raw && (
        <Box className={time}>
          <Typography variant="h5" className={timeFont}>{format(now, 'yyyy-MM-dd HH:mm:ss')}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default withLayout(observer(Phrase), {
  disableHeader: true,
  title: 'Phrase',
  theme: 'dark',
})
