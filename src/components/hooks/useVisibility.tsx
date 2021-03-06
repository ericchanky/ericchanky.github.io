import { useCallback, useEffect, useState } from 'react'

const getEvent = () => {
  if ('hidden' in document) {
    return { hidden: 'hidden', visibilityChange: 'visibilitychange' }
  } else if ('mozHidden' in document) {
    return { hidden: 'mozHidden', visibilityChange: 'mozvisibilitychange' }
  } else if ('msHidden' in document) {
    return { hidden: 'msHidden', visibilityChange: 'msvisibilitychange' }
  } else if ('webkitHidden' in document) {
    return { hidden: 'webkitHidden', visibilityChange: 'webkitvisibilitychange' }
  }
  throw new Error('Visibility API not supported.')
}

export const useVisibility = () => {
  const { hidden, visibilityChange } = getEvent()
  const [visible, setVisible] = useState(true)

  const handleVisibilityChange = useCallback(() => {
    // @ts-ignore
    setVisible(!document[hidden])
  }, [hidden])

  useEffect(() => {
    document.addEventListener(visibilityChange, handleVisibilityChange, false)
    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange, false)
    }
  }, [handleVisibilityChange, visibilityChange])

  return visible
}
