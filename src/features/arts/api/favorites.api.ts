import { api } from '@arts/core'

import type { Product } from '../models'

export interface AddFavoriteResponse {
  success: boolean
  message: string
  favoriteId: number
}

export interface RemoveFavoriteResponse {
  success: boolean
  message: string
}

export interface FetchFavoriteIdsResponse {
  success: boolean
  favoriteIds: number[]
}

export interface FetchProductsByIdsResponse {
  success: boolean
  data: Product[]
}

export const removeFavorite = async (
  productId: number
): Promise<RemoveFavoriteResponse> => {
  return await api.DELETE<RemoveFavoriteResponse>(
    `/remove-favorite/${productId}`
  )
}

export const addFavorite = async (
  productId: number
): Promise<AddFavoriteResponse> => {
  return await api.POST<AddFavoriteResponse>('/add-favorite', { productId })
}

export const fetchProductsByIds = async (ids: number[]): Promise<Product[]> => {
  return (
    await api.POST<FetchProductsByIdsResponse>('/get-products-by-ids', {
      ids,
    })
  ).data
}

export const fetchFavoriteIds = async (): Promise<FetchFavoriteIdsResponse> => {
  return await api.GET<FetchFavoriteIdsResponse>('/favorite-ids')
}
