import { useCallback, useEffect, useState } from 'react'

export const useMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [updateMousePosition])

  return mousePosition
}
