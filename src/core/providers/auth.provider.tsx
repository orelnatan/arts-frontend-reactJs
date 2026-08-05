import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { AuthContext } from '../contexts'
import { useToken, useUser } from '../hooks'
import type { User } from '../models'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [returnUrl, setReturnUrl] = useState<string>()
  const { token, removeToken } = useToken()
  const { getUser } = useUser()
  const location = useLocation()

  const currentUrl = `${location.pathname}${location.search}${location.hash}`

  // Bootstrap Auth
  useEffect(() => {
    const bootstrapAuth = async () => {
      if (token && !user) {
        try {
          setUser(await getUser())
        } catch (err) {
          console.error('Session expired or invalid token ', err)
          setReturnUrl(currentUrl)
        }
      }
      setLoading(false)
    }
    bootstrapAuth()
  }, [token, user, currentUrl, getUser])

  // Centralized logout function
  const disconnect = useCallback(
    (returnUrl?: string) => {
      setReturnUrl(returnUrl ?? currentUrl)
      setUser(null)
      removeToken()
    },
    [removeToken, currentUrl]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        returnUrl,
        setUser,
        disconnect,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
