import { useState, useCallback } from 'react'

import { fetchProductsByIds } from '../api'
import type { Product } from '../models'

export const useFetchProductsByIds = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerFetchProductsByIds = useCallback(
    async (ids: number[]): Promise<Product[]> => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchProductsByIds(ids)

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

  return { triggerFetchProductsByIds, loading, error }
}
