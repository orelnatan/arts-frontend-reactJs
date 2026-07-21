import { useState, useCallback } from 'react'

import { removeFavorite, type RemoveFavoriteResponse } from '../api'

export const useRemoveFavorite = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerRemoveFavorite = useCallback(
    async (productId: number): Promise<RemoveFavoriteResponse> => {
      setLoading(true)
      setError(null)

      try {
        const data = await removeFavorite(productId)

        return data
      } catch (err: unknown) {
        setError(String(err))

        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { triggerRemoveFavorite, loading, error }
}
