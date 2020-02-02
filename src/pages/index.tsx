import React from 'react'

import { withLayout } from '../components/Layout'
import Menu from '../components/Menu'

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
