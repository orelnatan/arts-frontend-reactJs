import { useState, useCallback, useMemo, type ReactNode } from 'react'

import { CategoriesContext } from '../contexts'
import { fetchCategories } from '../api'
import type { Category } from '../models'

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Record<number, Category[]>>({})
  const [loading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadCategories = useCallback(
    async (brandId: number) => {
      if (categories[brandId]) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchCategories(brandId)
        setCategories((prev) => ({
          ...prev,
          [brandId]: data,
        }))
      } catch (err) {
        setError(String(err))
      } finally {
        setIsLoading(false)
      }
    },
    [categories]
  )

  const value = useMemo(
    () => ({
      categories,
      loading,
      error,
      loadCategories,
    }),
    [categories, loading, error, loadCategories]
  )

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
