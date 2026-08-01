import { useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { NavigationContext } from '../contexts'

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()

  const [currentLocation, setCurrentLocation] = useState<string>(pathname)
  const [previousLocation, setPreviousLocation] = useState<string | null>(null)

  // When pathname changes, shift currentLocation to previousLocation
  if (currentLocation !== pathname) {
    setPreviousLocation(currentLocation)
    setCurrentLocation(pathname)
  }

  return (
    <NavigationContext.Provider value={{ currentLocation, previousLocation }}>
      {children}
    </NavigationContext.Provider>
  )
}
