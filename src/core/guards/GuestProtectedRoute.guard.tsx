import { type ReactNode } from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

import { useAuthContext } from '../hooks'

interface GuestProtectedRouteProps {
  children: ReactNode
}

export const GuestProtectedRoute = ({ children }: GuestProtectedRouteProps) => {
  const { user, loading } = useAuthContext()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  // Show loading while session resolves
  if (loading) {
    return <div>Loading session...</div>
  }

  // If user is already authenticated, redirect them out of the guest routes
  if (user) {
    // 1. Prioritize returnUrl query param from URL
    // 2. Fall back to location state origin
    // 3. Fall back to root dashboard '/home'
    const targetUrl =
      searchParams.get('returnUrl') || location.state?.from || '/home'

    return <Navigate to={targetUrl} replace />
  }

  // If guest, allow access to auth screens
  return <>{children}</>
}
