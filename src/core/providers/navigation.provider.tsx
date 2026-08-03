import { useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationContext } from '../contexts'

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const fullPath = `${location.pathname}${location.search}${location.hash}`

  const [currentLocation, setCurrentLocation] = useState<string>(fullPath)
  const [previousLocation, setPreviousLocation] = useState<string | null>(null)

  if (currentLocation !== fullPath) {
    setPreviousLocation(currentLocation)
    setCurrentLocation(fullPath)
  }

  return (
    <NavigationContext.Provider value={{ currentLocation, previousLocation }}>
      {children}
    </NavigationContext.Provider>
  )
}
