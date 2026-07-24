import { createContext } from 'react'

import type { Brand } from '../models'

export interface BrandsContextType {
  brands: Brand[]
  loading: boolean
  error: string | null
  loadBrands: () => Promise<void>
}

export const BrandsContext = createContext<BrandsContextType | undefined>(
  undefined
)
