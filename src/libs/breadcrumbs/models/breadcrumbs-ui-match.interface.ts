import type { UIMatch } from 'react-router-dom'

import type { Crumb } from './crumb.interface'

interface BreadcrumbsRouteHandle {
  breadcrumbs?: Crumb[]
}

export type BreadcrumbsUiMatch = UIMatch<unknown, BreadcrumbsRouteHandle>
