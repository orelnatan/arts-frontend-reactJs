import { api } from '@arts/core'

import type { Product } from '../models'

export interface ProductsListResponse {
  success: boolean
  data: Product[]
}

export interface SingularProductResponse {
  success: boolean
  data: Product
}

export interface UpdateProductResponse {
  success: boolean
  message?: string
}

export const fetchProducts = async (familyId: number): Promise<Product[]> => {
  return (
    await api.GET<ProductsListResponse>(
      `/get-products-by-family-id/${familyId}`
    )
  ).data
}

export const fetchProductById = async (id: number): Promise<Product> => {
  return (await api.GET<SingularProductResponse>(`/get-product-by-id/${id}`))
    .data
}

export const updateProduct = async (
  product: Product
): Promise<UpdateProductResponse> => {
  return await api.PUT<UpdateProductResponse>(
    `/update-product/${product.id}`,
    product
  )
}
