import { api } from '@arts/core'

import type { Family } from '../models'

interface FamiliesResponse {
  success: boolean
  data: Family[]
}

export const fetchFamilies = async (categoryId: number): Promise<Family[]> => {
  return (
    await api.GET<FamiliesResponse>(
      `/get-families-by-category-id/${categoryId}`
    )
  ).data
}
