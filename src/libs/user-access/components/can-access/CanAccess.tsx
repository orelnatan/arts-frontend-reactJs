// libs/user-access/src/components/CanAccess.tsx
import { type ReactNode } from 'react'

import { useUserAccessContext } from '../../hooks'
import type { UserType } from '../../models'

interface CanAccessProps {
  roles: UserType[]
  fallback?: ReactNode
  children: ReactNode
}

export default function CanAccess({
  roles,
  fallback = null,
  children,
}: CanAccessProps) {
  const { hasAccess } = useUserAccessContext()

  return hasAccess(roles) ? <>{children}</> : <>{fallback}</>
}
