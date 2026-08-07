import { useCallback, type ReactNode } from 'react'

import { useAuthContext } from '@arts/core'

import { UserAccessContext } from '../contexts'
import type { UserType } from '../models'

export const UserAcessProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext()

  const userType = user?.type as UserType

  const hasAccess = useCallback(
    (roles: UserType[]): boolean => {
      return roles.includes(userType)
    },
    [userType]
  )

  return (
    <UserAccessContext.Provider
      value={{ userType: user?.type as UserType, hasAccess }}
    >
      {children}
    </UserAccessContext.Provider>
  )
}
