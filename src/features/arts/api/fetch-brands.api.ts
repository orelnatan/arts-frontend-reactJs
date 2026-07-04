import { api } from '@arts/core'

import type { Brand } from '../models'

interface BrandsResponse {
  success: boolean
  data: Brand[]
}

export const fetchBrands = async (): Promise<Brand[]> => {
  return (await api.GET<BrandsResponse>('/get-all-brands')).data
}
