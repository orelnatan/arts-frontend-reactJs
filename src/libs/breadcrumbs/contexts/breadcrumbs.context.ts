import { createContext } from 'react'

import type { Crumb } from '../models'

export interface BreadcrumbsContextType {
  breadcrumbs: Crumb[]
  hasCacheWithKey: (cacheKey: string) => boolean
  getCrumbData: (cacheKey: string) => Partial<Crumb> | undefined
  saveCrumbData: (cacheKey: string, data: Partial<Crumb>) => void
}

export const BreadcrumbsContext = createContext<
  BreadcrumbsContextType | undefined
>(undefined)
