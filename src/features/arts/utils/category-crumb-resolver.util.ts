import type { Crumb } from '@arts/libs/breadcrumbs'

import { fetchCategoryById } from '../api'

export const categoryCrumbResolver = async (
  categoryId: string | undefined
): Promise<Partial<Crumb>> => {
  const category = await fetchCategoryById(Number(categoryId))

  return {
    label: category.name,
  }
}
