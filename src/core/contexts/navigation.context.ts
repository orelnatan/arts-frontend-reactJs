import { createContext } from 'react'

interface NavigationContextType {
  currentLocation: string
  previousLocation: string | null
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined)
