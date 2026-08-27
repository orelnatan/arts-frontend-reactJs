import { useMemo, useState, type ReactNode } from 'react'
import { useMatches } from 'react-router-dom'

import { BreadcrumbsContext } from '../contexts'
import { generateBreadcrumbsConfig } from '../utils'
import type { BreadcrumbsUiMatch, Crumb } from '../models'

export const BreadcrumbsProvider = ({ children }: { children: ReactNode }) => {
  const [cachedCrumbs, setCachedCrumbs] = useState<
    Record<string, Partial<Crumb>>
  >({})
  const matches = useMatches()

  const breadcrumbs = useMemo(() => {
    const activeBreadcrumbMatches = (matches as BreadcrumbsUiMatch[]).filter(
      (match) => match.handle?.breadcrumbs
    )

    return generateBreadcrumbsConfig(activeBreadcrumbMatches)
  }, [matches])

  const hasCacheWithKey = (cacheKey: string): boolean => {
    return cacheKey in cachedCrumbs
  }

  const getCrumbData = (cacheKey: string): Partial<Crumb> => {
    return cachedCrumbs[cacheKey]
  }

  const saveCrumbData = (cacheKey: string, data: Partial<Crumb>): void => {
    setCachedCrumbs((current) => ({
      ...current,
      [cacheKey]: data,
    }))
  }

  return (
    <BreadcrumbsContext.Provider
      value={{ breadcrumbs, getCrumbData, saveCrumbData, hasCacheWithKey }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  )
}
