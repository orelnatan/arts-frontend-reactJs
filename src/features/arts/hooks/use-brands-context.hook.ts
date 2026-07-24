import { useContext } from 'react'

import { BrandsContext } from '../contexts'

export const useBrandsContext = () => {
  const context = useContext(BrandsContext)

  if (!context) {
    throw new Error('useBrandsContext must be used within a BrandsProvider')
  }

  return context
}
