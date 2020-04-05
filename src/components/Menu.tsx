import { CardContent, Grid } from '@material-ui/core'
import React from 'react'

import Link from './Link'

const routes = [
  { key: 'home', name: 'Home', url: '/' },
  { key: 'encode-url', name: 'Encode/Decode URL', url: '/encodeURL' },
  { key: 'json-viewer', name: 'JSON Viewer', url: '/jsonViewer' },
  { key: 'timer', name: 'Timer', url: '/timer' },
  { key: 'calendiary', name: 'Calendiary', url: '/calendiary' },
]

interface Props {
  disables?: string[]
  filter?: string
}

const Menu = ({ disables = [], filter = '' }: Props) => {
  const currentPath = React.useMemo(() => {
    if (typeof window === 'undefined') { return '/' }
    return window.location.pathname
  }, [])

  const matched = React.useCallback((url: string) => {
    return currentPath.split('/').reduce((res, path) => {
      return res || new RegExp(path).test(url.replace('/', ''))
    }, false)
  }, [currentPath])

  const filterRegex = React.useMemo(() => new RegExp(filter, 'i'), [filter])

  return (
    <Grid container>
      {routes
        .filter((route) => !disables.includes(route.key))
        .filter((route) => {
          if (!filter) { return true }
          return route.url.match(filterRegex) || route.name.match(filterRegex)
        })
        .map((route) => {
          return (
            <Grid key={route.key} item xs={12} sm={6} md={4} lg={2}>
              <CardContent>
                <Link underline="none" color={matched(route.url) ? 'secondary' : 'primary'} href={route.url}>{route.name}</Link>
              </CardContent>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default Menu
