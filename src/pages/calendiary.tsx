import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Box, fade, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'
import { deepOrange } from '@material-ui/core/colors'
import { endOfDay, endOfMonth, endOfWeek, format, getDay, parseISO, startOfDay, startOfMonth, startOfWeek } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import { observer } from 'mobx-react'
import qs from 'qs'
import React from 'react'
import { Calendar, CalendarProps, dateFnsLocalizer } from 'react-big-calendar'

import { AuthProps, withAuth } from '../components/Auth'
import EditPost from '../components/Calendiary/EditPost'
import PostAgendaEvent from '../components/Calendiary/PostAgendaEvent'
import PostDateHeader from '../components/Calendiary/PostDateHeader'
import PostEvent from '../components/Calendiary/PostEvent'
import PostToolbar from '../components/Calendiary/PostToolbar'
import Image from '../components/Image'
import { withLayout } from '../components/Layout'
import useDimension from '../components/useDimension'
import { storeContext } from '../store'
import { CalendiaryPost, getPosts } from '../utils/calendiary'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parseISO,
  startOfWeek,
  getDay,
  locales,
})

const useStyles = makeStyles((theme: Theme) => {
  return {
    '@global': {
      'body': {
        overflow: 'hidden',
      },
      '.rbc-header span': {
        letterSpacing: '2.5px',
      },
      '.rbc-row-content': {
        maxHeight: '100%',
      },
      '.rbc-row-segment': {
        overflow: 'auto',

        '& .rbc-event': {
          padding: theme.spacing(0.5, 1),
        },
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
      '.rbc-day-bg.rbc-off-range-bg': {
        background: 'transparent',
      },
      '.rbc-day-bg.rbc-today': {
        background: 'transparent',
      },
      '.rbc-time-slot, .rbc-timeslot-group': {
        borderColor: 'transparent!important',
      },
      '.rbc-event-label': {
        display: 'none!important',
      },
      '.rbc-row-content .rbc-row:first-child': {
        position: 'absolute',
        zIndex: -1,
      },
      '.rbc-row-content .rbc-row': {
        width: '100%',
        height: '100%',
      },
      '.rbc-date-cell': {
        color: fade('#fff', 0.1),
        '&.rbc-off-range': {
          color: fade('#fff', 0.05),
        },
        '&.rbc-now': {
          color: fade(deepOrange.A400, 0.5),
        },
      },
    },
  }
})

interface Props extends AuthProps {}

const CalendarPage = ({ password: passcode }: Props) => {
  useStyles()
  const { calendiary } = React.useContext(storeContext)
  const { height } = useDimension()
  const [view, setView] = React.useState<CalendarProps['view']>('month')
  const [navigatedDate, setNavigatedDate] = React.useState(new Date())
  const [editDialog, setEditDialog] = React.useState<{ open: boolean, post?: Partial<CalendiaryPost> }>({ open: false })
  const [posts, setPosts] = React.useState<CalendiaryPost[]>([])

  const fetch = React.useCallback(async () => {
    const res = await getPosts(passcode, startOfWeek(startOfMonth(navigatedDate)).getTime(), endOfWeek(endOfMonth(navigatedDate)).getTime())
    setPosts(res.data.calendiaries)
  }, [navigatedDate, passcode])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  React.useEffect(() => {
    setView(isMobile ? 'agenda' : 'month')
  }, [isMobile])

  const events = React.useMemo(() => {
    return posts.map((post) => {
      return {
        event: {},
        color: post.color,
        start: startOfDay(new Date(post.date)),
        end: endOfDay(new Date(post.date)),
        allDay: !isMobile,
        title: post.text,
        post,
      }
    })
  }, [isMobile, posts])

  React.useEffect(() => {
    const code = qs.parse(location.search.substring(1)).wallpaper
    if (code) {
      calendiary.set({ wallpaperCode: code })
    }
  }, [calendiary])

  return (
    <Box>
      {calendiary.wallpaperCode && (
        <Box style={{ position: 'fixed', zIndex: -1 }}>
          <Image password={calendiary.wallpaperCode} raw wallpaper />
        </Box>
      )}
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        view={view}
        views={{
          month: true,
          agenda: PostAgendaEvent,
        }}
        onView={setView}
        date={navigatedDate}
        onNavigate={(newDate) => {
          setNavigatedDate(newDate)
        }}
        // @ts-ignore
        style={{ height }}
        formats={{
          dateFormat: 'd',
          timeGutterFormat: 'HH:mm',
          dayHeaderFormat: 'EEE, do MMM',
        }}
        components={{
          event: PostEvent,
          toolbar: PostToolbar,
          month: {
            // @ts-ignore
            dateHeader: PostDateHeader,
          },
        }}
        eventPropGetter={(event: typeof events[0]) => {
          return {
            style: {
              outline: 'none',
              backgroundColor: 'transparent',
              color: event.color || 'white',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
            },
          }
        }}
        onSelectSlot={(slot) => setEditDialog({ open: true, post: { date: new Date(slot.start).getTime(), passcode } })}
        // @ts-ignore
        onSelectEvent={(event) => setEditDialog({ open: true, post: event.post })}
      />
      {editDialog.post && (
        <EditPost
          // @ts-ignore
          dialogProps={{ open: editDialog.open }}
          post={editDialog.post}
          fetch={fetch}
          onClose={() => setEditDialog({ open: false, post: undefined })}
        />
      )}
    </Box>
  )
}

export default withLayout(withAuth(observer(CalendarPage), { required: true, passthrough: true }), {
  title: 'Calendiary',
  disableHeader: true,
  theme: 'dark',
  meta: [
    { name: 'description', content: 'Useful tools for development or daily life.' },
  ],
})
