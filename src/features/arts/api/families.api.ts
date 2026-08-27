import { api } from '@arts/core'

import type { Family } from '../models'

export interface FamiliesResponse {
  success: boolean
  data: Family[]
}

export interface SingleFamilyResponse {
  success: boolean
  data: Family
}

export const fetchFamilies = async (categoryId: number): Promise<Family[]> => {
  return (
    await api.GET<FamiliesResponse>(
      `/get-families-by-category-id/${categoryId}`
    )
  ).data
}

export const fetchFamilyById = async (id: number): Promise<Family> => {
  return (await api.GET<SingleFamilyResponse>(`/get-family-by-id/${id}`)).data
}
