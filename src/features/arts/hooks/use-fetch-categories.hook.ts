import { useQuery } from '@tanstack/react-query'

import { fetchCategories } from '../api'
import type { Category } from '../models'

export const useFetchCategories = (brandId: number) => {
  const { data, isLoading, error } = useQuery<Category[], Error>({
    queryKey: ['categories', brandId],
    queryFn: () => fetchCategories(brandId),
    enabled: !!brandId,
  })

  return {
    categories: data ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  }
}
