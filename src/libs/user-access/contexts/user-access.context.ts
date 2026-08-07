import { createContext } from 'react'
import type { UserType } from '../models'

interface UserAccessContextType {
  userType: UserType
  hasAccess: (roles: UserType[]) => boolean
}

export const UserAccessContext = createContext<
  UserAccessContextType | undefined
>(undefined)
