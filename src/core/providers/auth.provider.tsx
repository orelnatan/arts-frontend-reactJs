import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts'
import { useToken, useUser } from '../hooks'
import type { User } from '../models'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [returnUrl, setReturnUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [hasReturnUrl, setHasReturnUrl] = useState<boolean>(false)

  const { token, removeToken } = useToken()
  const { getUser } = useUser()
  const navigate = useNavigate()

  // Bootstrap Auth
  useEffect(() => {
    const bootstrapAuth = async () => {
      if (token && !user) {
        try {
          setUser(await getUser())
        } catch (err) {
          console.error('Session expired or invalid token ', err)
        }
      }
      setLoading(false)
    }
    bootstrapAuth()
  }, [token, user, getUser])

  // Centralized logout function
  const disconnect = useCallback(
    (resetReturnUrl: boolean = false) => {
      setUser(null)
      removeToken()

      if (resetReturnUrl) {
        setReturnUrl(null)
      }

      navigate('/auth')
    },
    [removeToken, navigate, setReturnUrl]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        returnUrl,
        hasReturnUrl,
        setUser,
        disconnect,
        setReturnUrl,
        setHasReturnUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
