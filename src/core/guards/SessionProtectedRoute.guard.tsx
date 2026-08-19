import { type ReactNode, useEffect } from 'react'

import { INVALID_AUTH_SESSION_LABEL } from '@arts/auth.consts'

import { useAuthContext } from '../hooks'

interface SessionProtectedRouteProps {
  children: ReactNode
}

export const SessionProtectedRoute = ({
  children,
}: SessionProtectedRouteProps) => {
  const { disconnect } = useAuthContext()

  useEffect(() => {
    const handleInvalidSession = () => {
      disconnect()
    }

    window.addEventListener(INVALID_AUTH_SESSION_LABEL, handleInvalidSession)
    return () => {
      window.removeEventListener(
        INVALID_AUTH_SESSION_LABEL,
        handleInvalidSession
      )
    }
  }, [disconnect])

  return <>{children}</>
}
