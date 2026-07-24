import { createContext } from 'react'

import type { Product } from '../models'

export interface ProductsContextType {
  products: Record<number, Product[]>
  favorites: Product[]
  product: Product | null
  loadingProduct: boolean
  loadingProducts: boolean
  loadingFavorites: boolean
  loadingFavoritesIds: boolean
  error: string | null
  loadProducts: (familyId: number) => Promise<void>
  loadProduct: (
    productId: number,
    familyId?: number
  ) => Promise<Product | undefined>
  updateProduct: (updatedProduct: Product) => void
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
)
