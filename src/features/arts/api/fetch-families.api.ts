import { api } from "@arts/core";

import type { Family } from "../models";

interface ApiResponse {
  success: boolean;
  data: Family[];
}

export const fetchFamilies = async (categoryId: number): Promise<Family[]> => {
  return (await api.GET<ApiResponse>(`/get-families-by-category-id/${categoryId}`)).data;
};