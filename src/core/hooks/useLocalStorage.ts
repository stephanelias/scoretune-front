import { useCallback, useState } from 'react'

export function useLocalStorage(key: string = 'token') {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem(key)
  })

  const setToken = useCallback(
    (value: string) => {
      localStorage.setItem(key, value)
      setTokenState(value)
    },
    [key],
  )

  const removeToken = useCallback(() => {
    localStorage.removeItem(key)
    setTokenState(null)
  }, [key])

  return { token, setToken, removeToken }
}
