import { RefObject, useCallback, useRef } from 'react'

export const useCopy = (): [RefObject<HTMLInputElement>, () => void] => {
  const ref = useRef<HTMLInputElement>(null)

  const copy = useCallback(() => {
    if (!ref.current) return
    ref.current.select()
    document.execCommand('copy')
  }, [])

  return [ref, copy]
}
