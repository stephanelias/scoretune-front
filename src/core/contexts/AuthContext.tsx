import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCurrentUser } from '../../features/auth/hooks/useCurrentUser'
import { useLogin } from '../../features/auth/hooks/useLogin'
import { useRegister } from '../../features/auth/hooks/useRegister'
import type { LoginRequestDto } from '../../features/auth/models/LoginRequestDto'
import { RegisterRequestDto } from '../../features/auth/models/RegisterRequestDto'
import { User } from '../../features/auth/models/User'
import { useLocalStorage } from '../hooks/useLocalStorage'

type AuthContextType = {
  user: User | null
  token: string | null
  login: (data: LoginRequestDto) => Promise<void>
  register: (data: RegisterRequestDto) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const { token, setToken, removeToken } = useLocalStorage()
  const { mutateAsync: loginMutation } = useLogin()
  const { mutateAsync: registerMutation } = useRegister()
  const { refetch } = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      refetch()
        .then(res => {
          setUser(res.data ?? null)
        })
        .catch(() => {
          setUser(null)
          removeToken()
        })
    } else {
      setUser(null)
    }
  }, [token, refetch, removeToken])

  const register = async (data: RegisterRequestDto) => {
    await registerMutation(data)
  }

  const login = async (data: LoginRequestDto) => {
    const res = await loginMutation(data)
    setToken(res.token)
    const userRes = await refetch()
    setUser(userRes.data ?? null)
    navigate('/')
  }

  const logout = async () => {
    removeToken()
    setUser(null)
    navigate('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider />')
  return context
}
