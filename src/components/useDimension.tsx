import React from 'react'

const useDimension = () => {
  const [dimension, setDimension] = React.useState({ width: window.innerWidth, height: window.innerHeight })

  const update = React.useCallback(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
    }
  }, [update])

  return dimension
}

export default useDimension
