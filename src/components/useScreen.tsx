import { useCallback, useEffect, useState } from 'react'

const useScreen = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const updateSize = useCallback(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateSize)
    return window.removeEventListener('resize', updateSize)
  }, [updateSize])

  return size
}

export default useScreen
