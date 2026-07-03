import { api } from "@arts/core";

import type { Product } from "../models";

interface FetchProductsResponse {
  success: boolean;
  data: Product[];
}

interface FetchProductResponse {
  success: boolean;
  data: Product;
}

export const fetchProducts = async (familyId: number): Promise<Product[]> => {
  return (await api.GET<FetchProductsResponse>(`/get-products-by-family-id/${familyId}`)).data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  return (await api.GET<FetchProductResponse>(`/get-product-by-id/${id}`)).data;
};