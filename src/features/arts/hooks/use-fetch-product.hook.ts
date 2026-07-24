import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'

import type { Product } from '../models'
import { fetchProductById } from '../api'

export const useFetchProduct = (productId: number, familyId?: number) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    initialData: () => getProductFromCache(queryClient, productId, familyId),
    staleTime: 10000,
  })

  return {
    product: data ?? null,
    loading: isLoading,
    error: error ? error.message : null,
  }
}

const getProductFromCache = (
  queryClient: QueryClient,
  productId: number,
  familyId?: number
): Product | undefined => {
  if (!familyId) return undefined

  // 1. Look up the cached product list using its query key
  const cachedProducts = queryClient.getQueryData<Product[]>([
    'products',
    familyId,
  ])

  // 2. Find and return the specific product inside that cached list
  return cachedProducts?.find((product) => product.id === productId)
}
