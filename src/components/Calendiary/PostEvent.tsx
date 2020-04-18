import { Typography } from '@material-ui/core'
import { observer } from 'mobx-react'
import React from 'react'
import { EventProps } from 'react-big-calendar'
import ReactMarkdown from 'react-markdown'

import { storeContext } from '../../store'

interface Props {
  event: EventProps
}

const PostEvent = ({ event }: Props) => {
  const { calendiary } = React.useContext(storeContext)

  if (!calendiary.visibility) {
    return null
  }

  return (
    <Typography component="div" variant="body1">
      <ReactMarkdown source={event.title} />
    </Typography>
  )
}

export default observer(PostEvent)
