import type { Crumb } from '@arts/libs/breadcrumbs'

import { fetchProductById } from '../api'

export const productCrumbResolver = async (
  productId: string | undefined
): Promise<Partial<Crumb>> => {
  const product = await fetchProductById(Number(productId))

  return {
    label: product.name,
  }
}
