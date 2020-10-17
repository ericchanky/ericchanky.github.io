import { Box, Card, CardContent, CardHeader, Fab, fade, Grid, makeStyles, Theme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { addWeeks, format } from 'date-fns'
import React from 'react'
import { CalendarProps, EventProps, NavigateAction } from 'react-big-calendar'
import ReactMarkdown from 'react-markdown'

import { CalendiaryPost } from '../../api/calendiary'

const useStyle = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
    overflow: 'auto',
  },
  card: {
    background: fade('#000', 0.35),
    borderLeft: '1px solid #888',
  },
  cardHeader: {
    padding: theme.spacing(1),
  },
  cardContent: {
    padding: theme.spacing(1),
    whiteSpace: 'pre-line',
    '& ul, & ol': {
      paddingLeft: 18,
      margin: 0,
    },
    '& p': {
      margin: 0,
    },
  },
  addIcon: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const PostAgendaEvent = <TEvent extends object = Event, TResource extends object = object>({ events, onSelectEvent, onSelectSlot }: CalendarProps<TEvent & EventProps & { post: CalendiaryPost }, TResource>) => {
  const classes = useStyle()

  return (
    <Box className={classes.container}>
      <Grid container spacing={1}>
        {events?.map((event) => {
          return (
            <Grid key={event.post.id} item xs={12}>
              <Card
                square
                className={classes.card}
                style={{ borderColor: event.post.color }}
                onClick={(evt) => onSelectEvent && onSelectEvent(event, evt)}
              >
                <CardHeader
                  className={classes.cardHeader}
                  subheader={format(new Date(event.post.date), 'do MMMM, yyyy')}
                />
                <CardContent
                  className={classes.cardContent}
                  style={{ color: event.post.color }}
                >
                  <ReactMarkdown source={event.title} />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
      <Box className={classes.addIcon}>
        <Fab
          color="primary"
          onClick={() => onSelectSlot && onSelectSlot({
            start: new Date(),
            end: new Date(),
            slots: [],
            action: 'click',
          })}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}

PostAgendaEvent.title = () => {
  return 'List'
}

PostAgendaEvent.navigate = (date: Date, action: NavigateAction) => {
  switch (action) {
  case 'PREV':
    return addWeeks(date, -1)
  case 'NEXT':
    return addWeeks(date, 1)
  default:
    return date
  }
}

export default PostAgendaEvent
