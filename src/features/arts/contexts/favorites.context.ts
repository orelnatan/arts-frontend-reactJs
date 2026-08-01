import { createContext } from 'react'

interface FavoritesContextType {
  favoriteIds: number[]
  loading: boolean
  error: string | null
  addFavoriteId: (productId: number) => void
  removeFavoriteId: (productId: number) => void
  isFavorite: (productId: number) => boolean
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)
