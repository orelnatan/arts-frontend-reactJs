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

export interface FetchProductsByIdsResponse {
  success: boolean
  data: Product[]
}

export interface DeleteProductResponse {
  success: boolean
  message?: string
}

export const fetchProductsByIds = async (ids: number[]): Promise<Product[]> => {
  return (
    await api.POST<FetchProductsByIdsResponse>('/get-products-by-ids', {
      ids,
    })
  ).data
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

export const deleteProduct = async (
  id: number
): Promise<DeleteProductResponse> => {
  return await api.DELETE<DeleteProductResponse>(`/remove-product/${id}`)
}

export const updateProduct = async (
  product: Product
): Promise<UpdateProductResponse> => {
  return await api.PUT<UpdateProductResponse>(
    `/update-product/${product.id}`,
    product
  )
}
