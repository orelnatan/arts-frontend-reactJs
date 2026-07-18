import { useState, useCallback } from 'react'

import { addFavorite, type AddFavoriteResponse } from '../api'

export const useAddFavorite = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerAddFavorite = useCallback(
    async (productId: number): Promise<AddFavoriteResponse> => {
      setLoading(true)
      setError(null)

      try {
        const data = await addFavorite(productId)

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

  return { triggerAddFavorite, loading, error }
}
