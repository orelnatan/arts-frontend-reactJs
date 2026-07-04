import { useQuery } from '@tanstack/react-query'

import { fetchFamilies } from '../api'
import type { Family } from '../models'

export const useFetchFamilies = (categoryId: number) => {
  const { data, isLoading, error } = useQuery<Family[], Error>({
    queryKey: ['families', categoryId],
    queryFn: () => fetchFamilies(categoryId),
    enabled: !!categoryId,
  })

  return {
    families: data ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  }
}
