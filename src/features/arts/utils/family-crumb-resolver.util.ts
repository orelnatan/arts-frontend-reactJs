import type { Crumb } from '@arts/libs/breadcrumbs'

import { fetchFamilyById } from '../api'

export const familyCrumbResolver = async (
  familyId: string | undefined
): Promise<Partial<Crumb>> => {
  const family = await fetchFamilyById(Number(familyId))

  return {
    label: family.name,
  }
}
