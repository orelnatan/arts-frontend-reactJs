import { useState, useCallback, useMemo, type ReactNode } from 'react'

import { FamiliesContext } from '../contexts'
import { fetchFamilies } from '../api'
import type { Family } from '../models'

export const FamiliesProvider = ({ children }: { children: ReactNode }) => {
  const [families, setFamilies] = useState<Record<number, Family[]>>({})
  const [loading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadFamilies = useCallback(
    async (categoryId: number) => {
      if (families[categoryId]) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchFamilies(categoryId)
        setFamilies((prev) => ({
          ...prev,
          [categoryId]: data,
        }))
      } catch (err) {
        setError(String(err))
      } finally {
        setIsLoading(false)
      }
    },
    [families]
  )

  const value = useMemo(
    () => ({
      families,
      loading,
      error,
      loadFamilies,
    }),
    [families, loading, error, loadFamilies]
  )

  return (
    <FamiliesContext.Provider value={value}>
      {children}
    </FamiliesContext.Provider>
  )
}
