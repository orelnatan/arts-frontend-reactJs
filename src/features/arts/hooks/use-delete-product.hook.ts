import { useState, useCallback } from 'react'

import { deleteProduct, type DeleteProductResponse } from '../api'

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerDeleteProduct = useCallback(
    async (productId: number): Promise<DeleteProductResponse> => {
      setLoading(true)
      setError(null)

      try {
        const data = await deleteProduct(productId)

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

  return { triggerDeleteProduct, loading, error }
}
