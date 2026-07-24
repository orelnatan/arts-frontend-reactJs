import { useState, useCallback } from 'react'

import { fetchProductById } from '../api'
import type { Product } from '../models'

export const useFetchProduct = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProduct = useCallback(
    async (productId: number): Promise<Product> => {
      setLoading(true)
      setError(null)

      try {
        const product = await fetchProductById(productId)

        return product
      } catch (err: unknown) {
        setError(String(err))

        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { getProduct, loading, error }
}
