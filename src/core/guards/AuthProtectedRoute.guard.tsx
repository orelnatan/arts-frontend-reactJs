import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthContext } from '../hooks'

interface AuthProtectedRouteProps {
  children: ReactNode
}

export const AuthProtectedRoute = ({ children }: AuthProtectedRouteProps) => {
  const { user, loading, returnUrl } = useAuthContext()

  // Show loading while we check the token on app load...
  if (loading) {
    return <div>Loading session...</div>
  }

  // Redirect to login if there is no user in context
  if (!user) {
    const search = new URLSearchParams({
      returnUrl: String(returnUrl),
    }).toString()

    return <Navigate to={`/auth/login?${search}`} replace />
  }

  // If user exists, render the child routes
  return <>{children}</>
}
