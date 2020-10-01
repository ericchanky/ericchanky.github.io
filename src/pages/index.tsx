import React from 'react'

import Page from '../components/Layout/Page'
import { withLayout } from '../components/Layout/withLayout'
import Menu from '../components/Menu/Menu'

const Index = () => {
  return (
    <Page>
      <Menu disables={['home']} />
    </Page>
  )
}

export default withLayout(Index, {
  title: 'Home Page',
  disableHeader: true,
  meta: [
    { name: 'description', content: 'Useful tools for development or daily life.' },
  ],
})
