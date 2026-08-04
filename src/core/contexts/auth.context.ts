import { createContext } from 'react'

import type { User } from '../models'

interface AuthContextType {
  user: User | null
  loading: boolean
  returnUrl: string | null
  hasReturnUrl: boolean
  setHasReturnUrl: (hasReturnUrl: boolean) => void
  setReturnUrl: (path: string | null) => void
  setUser: (user: User | null) => void
  disconnect: (resetReturnUrl?: boolean) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
