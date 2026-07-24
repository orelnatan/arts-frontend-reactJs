import { useState, useCallback, useMemo, type ReactNode } from 'react'

import { ProductsContext } from '../contexts'
import { fetchProducts } from '../api'
import type { Product } from '../models'

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Record<number, Product[]>>({})
  const [loading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(
    async (familyId: number) => {
      if (products[familyId]) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchProducts(familyId)
        setProducts((prev) => ({
          ...prev,
          [familyId]: data,
        }))
      } catch (err) {
        setError(String(err))
      } finally {
        setIsLoading(false)
      }
    },
    [products]
  )

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      loadProducts,
    }),
    [products, loading, error, loadProducts]
  )

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
