import { Typography } from '@material-ui/core'
import React from 'react'
import { EventProps } from 'react-big-calendar'
import ReactMarkdown from 'react-markdown'

interface Props {
  event: EventProps
}

const PostEvent = ({ event }: Props) => {
  return (
    <Typography component="div" variant="body1">
      <ReactMarkdown source={event.title} />
    </Typography>
  )
}

export default PostEvent
