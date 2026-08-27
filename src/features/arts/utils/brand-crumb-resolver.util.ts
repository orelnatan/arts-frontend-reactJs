import type { Crumb } from '@arts/libs/breadcrumbs'

import { fetchBrandById } from '../api'

export const brandCrumbResolver = async (
  brandId: string | undefined
): Promise<Partial<Crumb>> => {
  const brand = await fetchBrandById(Number(brandId))

  return {
    label: brand.name,
  }
}
