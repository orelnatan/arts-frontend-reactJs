import { api } from "@arts/core";

import type { Product } from "../models";

interface ProductsListResponse {
  success: boolean;
  data: Product[];
}

interface SingularProductResponse {
  success: boolean;
  data: Product;
}

export const fetchProducts = async (familyId: number): Promise<Product[]> => {
  return (await api.GET<ProductsListResponse>(`/get-products-by-family-id/${familyId}`)).data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  return (await api.GET<SingularProductResponse>(`/get-product-by-id/${id}`)).data;
};