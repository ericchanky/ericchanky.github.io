import { useReducer } from 'react'

const useObject = <T>(initialState: T) => {
  const [state, setState] = useReducer((s: T, a: Partial<T>) => {
    return { ...s, ...a } as T
  }, initialState)

  return [state, setState] as [T, React.Dispatch<Partial<T>>]
}

export default useObject
