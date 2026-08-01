import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { FavoritesContext } from '../contexts'
import { useFetchFavoriteIds } from '../hooks'

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const { getFavoriteIds, loading, error } = useFetchFavoriteIds()

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await getFavoriteIds()
        if (response.success) {
          setFavoriteIds(response.favoriteIds)
        }
      } catch (err) {
        console.error('Failed to load initial favorites:', err)
      }
    }

    loadFavorites()
  }, [getFavoriteIds])

  const addFavoriteId = useCallback((productId: number) => {
    setFavoriteIds((prev) => {
      if (prev.includes(productId)) return prev
      return [...prev, productId]
    })
  }, [])

  const removeFavoriteId = useCallback((productId: number) => {
    setFavoriteIds((prev) => prev.filter((id) => id !== productId))
  }, [])

  const isFavorite = useCallback(
    (productId: number) => favoriteIds.includes(productId),
    [favoriteIds]
  )

  const value = useMemo(
    () => ({
      favoriteIds,
      loading,
      error,
      addFavoriteId,
      removeFavoriteId,
      isFavorite,
    }),
    [favoriteIds, loading, error, addFavoriteId, removeFavoriteId, isFavorite]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
