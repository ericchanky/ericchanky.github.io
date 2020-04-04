import React from 'react'
import { EventProps } from 'react-big-calendar'
import ReactMarkdown from 'react-markdown'

interface Props {
  event: EventProps
}

const PostEvent = ({ event }: Props) => {
  return (
    // <Typography component="pre" variant="body2" style={{ whiteSpace: 'pre-line' }}>{event.title}</Typography>
    <ReactMarkdown source={event.title} />
  )
}

export default PostEvent
