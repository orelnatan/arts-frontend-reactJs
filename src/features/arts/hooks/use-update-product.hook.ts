import { useState, useCallback } from 'react'

import { updateProduct, type UpdateProductResponse } from '../api'
import type { Product } from '../models'

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerUpdate = useCallback(
    async (product: Product): Promise<UpdateProductResponse> => {
      setLoading(true)
      setError(null)

      try {
        const data = await updateProduct(product)

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

  return { triggerUpdate, loading, error }
}
