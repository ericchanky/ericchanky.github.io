import { Box, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import csv from 'csvtojson'
import { format, isBefore } from 'date-fns'
import { addHours } from 'date-fns/esm'
import { observer } from 'mobx-react'
import React from 'react'

import { withLayout } from '../components/Layout'
import { storeContext } from '../store'
import { take } from '../utils/rand'

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'relative',
    backgroundColor: 'black',
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

const source = `https://dzway.herokuapp.com/proxy?url=${encodeURIComponent('https://docs.google.com/spreadsheets/d/e/2PACX-1vTfSMdib9NVMRR0UxeFCg9jM_nLKxFpGwur-NjjdNQlpqZXerymjiNzQm_1Nu9P3bvnc-WzN51n4o8B/pub?gid=0&single=true&output=tsv')}`

const Phrase = () => {
  const { main, phrasePrimary, phraseSecondary, phraseContainer, time, timeFont } = useStyles()
  const { phrase } = React.useContext(storeContext)

  const [item, setItem] = React.useState<typeof phrase['list'][number]>()
  const [now, setNow] = React.useState(new Date)

  const fetch = React.useCallback(async () => {
    if (isBefore(new Date, phrase.nextUpdate)) { return }

    const res = await axios.get(source)
    csv({ headers: ['phrase', 'author'], delimiter: '\t' })
      .fromString(res.data)
      .then((data) => {
        phrase.set({ list: data as unknown as typeof phrase['list'], nextUpdate: addHours(new Date, 6) })
      })
  }, [phrase])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  React.useEffect(() => {
    if (!item && phrase.list.length > 0) {
      setItem(take(phrase.list))
    }
  }, [item, phrase.list])

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box className={main}>
      <Box className={phraseContainer}>
        <Typography className={phrasePrimary}>{item && item.phrase}</Typography>
        {item && item.author && (
          <Typography className={phraseSecondary}>— {item.author}</Typography>
        )}
      </Box>
      <Box className={time}>
        <Typography variant="h5" className={timeFont}>{format(now, 'yyyy-MM-dd HH:mm:ss')}</Typography>
      </Box>
    </Box>
  )
}

export default withLayout(observer(Phrase), {
  disableHeader: true,
  title: 'Phrase',
  theme: 'dark',
})
