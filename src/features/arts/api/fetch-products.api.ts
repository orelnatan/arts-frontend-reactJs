import { api } from "@arts/core";

import type { Product } from "../models";

interface ApiResponse {
  success: boolean;
  data: Product[];
}

export const fetchProducts = async (familyId: number): Promise<Product[]> => {
  return (await api.GET<ApiResponse>(`/get-products-by-family-id/${familyId}`)).data;
};
