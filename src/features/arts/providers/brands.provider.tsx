import { useState, useCallback, type ReactNode, useMemo } from 'react'

import { BrandsContext } from '../contexts'
import { fetchBrands } from '../api'
import type { Brand } from '../models'

export const BrandsProvider = ({ children }: { children: ReactNode }) => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadBrands = useCallback(async () => {
    if (brands.length > 0) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchBrands()
      setBrands(data)
    } catch (err) {
      setError(String(err))
    } finally {
      setIsLoading(false)
    }
  }, [brands.length])

  const value = useMemo(
    () => ({
      brands,
      loading,
      error,
      loadBrands,
    }),
    [brands, loading, error, loadBrands]
  )

  return (
    <BrandsContext.Provider value={value}>{children}</BrandsContext.Provider>
  )
}
