import { createContext } from 'react'

interface FavoritesContextType {
  favoriteIds: number[]
  loading: boolean
  error: string | null
  addFavorite: (productId: number) => void
  removeFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)
