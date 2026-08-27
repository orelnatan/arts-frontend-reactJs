import type { Crumb, BreadcrumbsUiMatch } from '../models'

export const generateBreadcrumbsConfig = (
  matches: BreadcrumbsUiMatch[]
): Crumb[] => {
  return matches.flatMap(
    (match) =>
      match.handle.breadcrumbs?.map((crumb: Crumb) => ({
        ...crumb,
        label: crumb.label ?? match.params[crumb.path],
      })) ?? []
  )
}
