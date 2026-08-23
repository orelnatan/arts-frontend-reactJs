import { useContext } from 'react'

import { BreadcrumbsContext } from '../contexts'

export const useBreadcrumbsContext = () => {
  const context = useContext(BreadcrumbsContext)

  if (!context) {
    throw new Error(
      'useBreadcrumbsContext must be used within a BreadcrumbsProvider'
    )
  }

  return context
}
