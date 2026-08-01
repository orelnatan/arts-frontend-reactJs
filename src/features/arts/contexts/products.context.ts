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
  errorFetchingProduct: string | null
  errorFetchingProducts: string | null
  errorFetchingFavorites: string | null
  errorFetchingFavoritesIds: string | null
  loadProducts: (familyId: number) => Promise<void>
  loadProduct: (
    productId: number,
    familyId: number
  ) => Promise<Product | undefined>
  updateProduct: (product: Product) => void
  deleteProduct: (productId: number, familyId: number) => void
  removeFavorite: (productId: number) => void
  addFavorite: (product: Product) => void
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
)
