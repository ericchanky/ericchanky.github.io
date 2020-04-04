import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Box, fade, makeStyles, Theme } from '@material-ui/core'
import { endOfMonth, format, formatISO, getDay, parse, startOfMonth, startOfWeek } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import qs from 'qs'
import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

import { AuthProps, withAuth } from '../components/Auth'
import EditPost from '../components/Calendiary/EditPost'
import PostEvent from '../components/Calendiary/PostEvent'
import PostToolbar from '../components/Calendiary/PostToolbar'
import Image from '../components/Image'
import { withLayout } from '../components/Layout'
import useDimension from '../components/useDimension'
import { CalendiaryPost, getAllPost } from '../utils/calendiary'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const useStyles = makeStyles((theme: Theme) => {
  return {
    '@global': {
      '.rbc-row-content': {
        maxHeight: '100%',
      },
      '.rbc-row': {
        maxHeight: 'calc(100% - 20px)',
      },
      '.rbc-row-segment': {
        overflow: 'auto',
      },
      '.rbc-current': {
        color: theme.palette.primary.main,
      },
      '.rbc-event-content': {
        whiteSpace: 'pre-line!important',
        '& ul, & ol': {
          paddingLeft: 18,
          margin: 0,
        },
        '& p': {
          margin: 0,
        },
      },
      '.rbc-off-range-bg': {
        background: `${fade('#111', 0.8)}!important`,
      },
      '.rbc-today': {
        background: `${fade('#eaf6ff', 0.6)}!important`,
      },
      // '.rbc-header, .rbc-month-view, .rbc-day-bg, .rbc-month-row': {
      //   borderColor: '#000!important',
      // },
    },
  }
})

interface Props extends AuthProps {}

const CalendarPage = ({ password: passcode }: Props) => {
  useStyles()
  const { height } = useDimension()
  const [createDialog, setCreateDialog] = React.useState({ open: false, date: new Date() })
  const [editDialog, setEditDialog] = React.useState<{ open: boolean, post?: Partial<CalendiaryPost> }>({ open: false })
  const [posts, setPosts] = React.useState<CalendiaryPost[]>([])

  const fetch = React.useCallback(async () => {
    const res = await getAllPost(passcode, startOfMonth(createDialog.date), endOfMonth(createDialog.date))
    setPosts(res.data.data)
  }, [createDialog.date, passcode])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  const events = React.useMemo(() => {
    return posts.map((post) => {
      return {
        event: {},
        color: post.color,
        start: post.date,
        end: post.date,
        allDay: true,
        title: post.text,
        post,
      }
    })
  }, [posts])

  const password = React.useMemo(() => {
    return qs.parse(location.search.substring(1)).password as string
  }, [])

  return (
    <Box>
      {password && (
        <Box style={{ position: 'fixed' }}>
          <Image password={password} raw wallpaper />
        </Box>
      )}
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        date={createDialog.date}
        onNavigate={(newDate) => {
          setCreateDialog({ open: createDialog.open, date: newDate })
        }}
        // @ts-ignore
        style={{ height }}
        components={{
          event: PostEvent,
          toolbar: PostToolbar,
        }}
        eventPropGetter={(event) => {
          return {
            style: {
              outline: 'none',
              backgroundColor: 'transparent',
              // @ts-ignore
              color: event.color || 'black',
            },
          }
        }}
        onSelectSlot={(slot) => setEditDialog({ open: true, post: { date: formatISO(new Date(slot.start)), passcode } })}
        // @ts-ignore
        onSelectEvent={(event) => setEditDialog({ open: true, post: event.post })}
      />
      {editDialog.post && (
        <EditPost
          dialogProps={{ open: editDialog.open }}
          post={editDialog.post}
          fetch={fetch}
          onClose={() => setEditDialog({ open: false, post: undefined })}
        />
      )}
    </Box>
  )
}

export default withLayout(withAuth(CalendarPage, { required: true, passthrough: true }), {
  title: 'Calendiary',
  disableHeader: true,
  theme: 'dark',
  meta: [
    { name: 'description', content: 'Useful tools for development or daily life.' },
  ],
})
