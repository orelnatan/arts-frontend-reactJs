import { createContext } from 'react'

import type { User } from '../models'
interface AuthContextType {
  user: User | null
  loading: boolean
  returnUrl?: string
  setUser: (user: User | null) => void
  disconnect: (returnUrl?: string) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
