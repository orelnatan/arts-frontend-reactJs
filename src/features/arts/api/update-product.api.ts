import { api } from '@arts/core'

import type { Product } from '../models'

export interface UpdateProductResponse {
  success: boolean
  message?: string
}

export const updateProduct = async (
  product: Product
): Promise<UpdateProductResponse> => {
  return await api.PUT<UpdateProductResponse>(
    `/update-product/${product.id}`,
    product
  )
}
