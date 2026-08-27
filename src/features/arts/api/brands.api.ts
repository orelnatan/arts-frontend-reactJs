import { api } from '@arts/core'

import type { Brand } from '../models'

export interface BrandsListResponse {
  success: boolean
  data: Brand[]
}

export interface SingleBrandResponse {
  success: boolean
  data: Brand
}

export const fetchBrands = async (): Promise<Brand[]> => {
  return (await api.GET<BrandsListResponse>('/get-all-brands')).data
}

export const fetchBrandById = async (id: number): Promise<Brand> => {
  return (await api.GET<SingleBrandResponse>(`/get-brand-by-id/${id}`)).data
}
