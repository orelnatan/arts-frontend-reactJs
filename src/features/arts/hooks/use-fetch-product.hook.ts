import { useState, useCallback, useEffect } from 'react'

import { useProductsContext } from './use-products-context.hook'
import { fetchProductById } from '../api'
import type { Product } from '../models'

export const useFetchProduct = (productId: number, familyId?: number) => {
  const { products } = useProductsContext()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getProduct = useCallback(async () => {
    // 1. Check if product exists under the specified familyId
    if (familyId && products[familyId]) {
      setProduct(
        products[familyId].find(
          (product) => product.id === productId
        ) as Product
      )
      return
    }

    // 2. Not found in context -> fetch from API
    setLoading(true)
    setError(null)

    try {
      const data = await fetchProductById(productId)
      setProduct(data)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }, [productId, familyId, products])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  return { product, loading, error, getProduct }
}
