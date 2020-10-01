import React from 'react'

import Menu from '../components/Menu'
import { withLayout } from '../components/withLayout'

const Index = () => {
  return (
    <Menu disables={['home']} />
  )
}

export default withLayout(Index, {
  title: 'Home Page',
  meta: [
    { name: 'description', content: 'Useful tools for development or daily life.' },
  ],
})
