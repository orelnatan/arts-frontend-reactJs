import { createContext } from 'react'

import type { Product } from '../models'

export interface ProductsContextType {
  products: Record<number, Product[]>
  loading: boolean
  error: string | null
  loadProducts: (familyId: number) => Promise<void>
  updateProduct: (updatedProduct: Product) => void
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
)
