import { createContext } from 'react'

import type { Category } from '../models'

export interface CategoriesContextType {
  categories: Record<number, Category[]>
  loading: boolean
  error: string | null
  loadCategories: (brandId: number) => Promise<void>
}

export const CategoriesContext = createContext<
  CategoriesContextType | undefined
>(undefined)
