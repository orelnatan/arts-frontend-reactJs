import { api } from '@arts/core'

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

export const addFavorite = async (
  productId: number
): Promise<AddFavoriteResponse> => {
  return await api.POST<AddFavoriteResponse>('/add-favorite', { productId })
}

export const removeFavorite = async (
  productId: number
): Promise<RemoveFavoriteResponse> => {
  return await api.DELETE<RemoveFavoriteResponse>(
    `/remove-favorite/${productId}`
  )
}

export const fetchFavoriteIds = async (): Promise<FetchFavoriteIdsResponse> => {
  return await api.GET<FetchFavoriteIdsResponse>('/favorite-ids')
}
