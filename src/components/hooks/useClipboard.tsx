import { useCallback } from 'react'

export const useClipboard = () => {
  const copy = useCallback((text: string) => {
    const input = document.createElement('input')
    input.style.position = 'absolute'
    input.style.opacity = '0'
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
  }, [])

  const clear = useCallback(() => {
    const input = document.createElement('input')
    input.style.position = 'absolute'
    input.style.opacity = '0'
    input.setAttribute('value', ' ')
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
  }, [])

  return { copy, clear }
}
