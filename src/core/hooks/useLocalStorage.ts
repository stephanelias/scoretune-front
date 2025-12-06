import { useState } from 'react'

export function useLocalStorage(key: string = 'token') {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem(key)
  })

  const setToken = (value: string) => {
    localStorage.setItem(key, value)
    setTokenState(value)
  }

  const removeToken = () => {
    localStorage.removeItem(key)
    setTokenState(null)
  }

  return { token, setToken, removeToken }
}
