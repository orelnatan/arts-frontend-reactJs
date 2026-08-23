import { createContext } from 'react'

import type { Crumb } from '../models'

export interface BreadcrumbsContextType {
  breadcrumbs: Crumb[]
}

export const BreadcrumbsContext = createContext<
  BreadcrumbsContextType | undefined
>(undefined)
