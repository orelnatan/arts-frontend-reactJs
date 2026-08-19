import { type ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useUserAccessContext } from '../hooks'
import type { UserType } from '../models'

interface AccessProtectedRouteProps {
  roles: UserType[]
  children?: ReactNode
}

export const AccessProtectedRoute = ({
  roles,
  children,
}: AccessProtectedRouteProps) => {
  const { hasAccess } = useUserAccessContext()

  if (!hasAccess(roles)) {
    return <Navigate to="/access-denied" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
