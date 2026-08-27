import { api } from '@arts/core'

import type { Category } from '../models'

export interface CategoriesResponse {
  success: boolean
  data: Category[]
}

export interface SingleCategoryResponse {
  success: boolean
  data: Category
}

export const fetchCategories = async (brandId: number): Promise<Category[]> => {
  return (
    await api.GET<CategoriesResponse>(`/get-categories-by-brand-id/${brandId}`)
  ).data
}

export const fetchCategoryById = async (id: number): Promise<Category> => {
  return (await api.GET<SingleCategoryResponse>(`/get-category-by-id/${id}`))
    .data
}
