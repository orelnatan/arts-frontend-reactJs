import { api } from '@arts/core'

export interface AddFavoriteResponse {
  success: boolean
  message: string
  favoriteId: number
}

export const addFavorite = async (
  productId: number
): Promise<AddFavoriteResponse> => {
  return await api.POST<AddFavoriteResponse>('/add-favorite', { productId })
}
