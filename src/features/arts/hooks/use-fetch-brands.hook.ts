import { useQuery } from '@tanstack/react-query'

import { fetchBrands } from '../api'
import type { Brand } from '../models'

export const useFetchBrands = () => {
  const { data, isLoading, error } = useQuery<Brand[], Error>({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  })

  return {
    brands: data ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  }
}
