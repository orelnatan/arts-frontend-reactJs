import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { Product } from '../models'

export const useSetCachedProduct = () => {
  const queryClient = useQueryClient()

  const updateProduct = useCallback(
    (updatedProduct: Product) => {
      // 1. Update the single product details cache
      queryClient.setQueryData(['product', updatedProduct.id], updatedProduct)

      // 2. Find and update the product inside the products list cache
      if (updatedProduct.familyId) {
        queryClient.setQueryData<Product[]>(
          ['products', updatedProduct.familyId],
          (currentList) =>
            currentList?.map((item) =>
              item.id === updatedProduct.id ? updatedProduct : item
            ) ?? []
        )
      }
    },
    [queryClient]
  )

  return { updateProduct }
}
