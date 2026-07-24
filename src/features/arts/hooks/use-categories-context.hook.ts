import { useContext } from 'react'

import { CategoriesContext } from '../contexts'

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext)

  if (!context) {
    throw new Error(
      'useCategoriesContext must be used within a CategoriesProvider'
    )
  }

  return context
}
