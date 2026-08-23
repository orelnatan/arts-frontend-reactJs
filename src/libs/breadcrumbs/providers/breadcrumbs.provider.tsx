import { useMemo, type ReactNode } from 'react'
import { useMatches } from 'react-router-dom'

import { BreadcrumbsContext } from '../contexts'
import { generateBreadcrumbsConfig } from '../utils'
import type { BreadcrumbsUiMatch } from '../models'

export const BreadcrumbsProvider = ({ children }: { children: ReactNode }) => {
  const matches = useMatches()

  const breadcrumbs = useMemo(() => {
    const activeBreadcrumbMatches = (matches as BreadcrumbsUiMatch[]).filter(
      (match) => match.handle?.breadcrumbs
    )

    return generateBreadcrumbsConfig(activeBreadcrumbMatches)
  }, [matches])

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  )
}
