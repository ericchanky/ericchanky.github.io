import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { CalendarProps } from 'react-big-calendar'

interface Props {
  label: string
  data: Date
  drilldownView: CalendarProps['view']
  isOffRange: boolean
}

const useStyles = makeStyles(() => ({
  date: {
    fontSize: '4rem',
  },
}))

const PostDateHeader = ({ label }: Props) => {
  const classes = useStyles()

  return (
    <Typography component="span" className={classes.date}>{label}</Typography>
  )
}

export default PostDateHeader
