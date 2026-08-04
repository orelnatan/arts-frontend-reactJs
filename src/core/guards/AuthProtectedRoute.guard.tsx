import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthContext } from '../hooks'

interface AuthProtectedRouteProps {
  children: ReactNode
}

export const AuthProtectedRoute = ({ children }: AuthProtectedRouteProps) => {
  const { user, loading, hasReturnUrl, setReturnUrl, setHasReturnUrl } =
    useAuthContext()

  const location = useLocation()

  const path = `${location.pathname}${location.search}${location.hash}`

  // Show loading while we check the token on app load...
  if (loading) {
    return <div>Loading session...</div>
  }

  // Redirect to login if there is no user in context
  if (!user) {
    if (!hasReturnUrl) {
      setHasReturnUrl(true)
      setReturnUrl(path)
    }

    return <Navigate to="/auth/login" replace />
  }

  // If user exists, render the child routes
  return <>{children}</>
}
