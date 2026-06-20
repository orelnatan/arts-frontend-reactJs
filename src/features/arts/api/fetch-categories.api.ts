import { api } from "@arts/core";

import type { Category } from "../models";

interface ApiResponse {
  success: boolean;
  data: Category[];
}

export const fetchCategories = async (brandId: number): Promise<Category[]> => {
  return (await api.GET<ApiResponse>(`/get-categories-by-brand-id/${brandId}`)).data;
};