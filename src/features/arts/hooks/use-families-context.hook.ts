import { useContext } from 'react'

import { FamiliesContext } from '../contexts'

export const useFamiliesContext = () => {
  const context = useContext(FamiliesContext)

  if (!context) {
    throw new Error('useFamiliesContext must be used within a FamiliesProvider')
  }

  return context
}
