import { useState, useCallback } from 'react'

import { fetchFavoriteIds, type FetchFavoriteIdsResponse } from '../api'

export const useFetchFavoriteIds = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getFavoriteIds =
    useCallback(async (): Promise<FetchFavoriteIdsResponse> => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchFavoriteIds()

        return data
      } catch (err: unknown) {
        setError(String(err))

        throw err
      } finally {
        setLoading(false)
      }
    }, [])

  return { getFavoriteIds, loading, error }
}
