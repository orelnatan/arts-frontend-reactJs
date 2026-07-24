import { createContext } from 'react'

import type { Family } from '../models'

export interface FamiliesContextType {
  families: Record<number, Family[]>
  loading: boolean
  error: string | null
  loadFamilies: (categoryId: number) => Promise<void>
}

export const FamiliesContext = createContext<FamiliesContextType | undefined>(
  undefined
)
