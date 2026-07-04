import { useQuery } from '@tanstack/react-query'

import { fetchProducts } from '../api'
import type { Product } from '../models'

export const useFetchProducts = (familyId: number) => {
  const { data, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['products', familyId],
    queryFn: () => fetchProducts(familyId),
    enabled: !!familyId,
  })

  return {
    products: data ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  }
}
