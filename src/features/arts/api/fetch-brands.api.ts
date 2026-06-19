import { api } from "@arts/core";

import type { Brand } from "../models";

interface ApiResponse {
  success: boolean;
  data: Brand[];
}

export const fetchBrands = async (): Promise<Brand[]> => {
  return (await api.GET<ApiResponse>('/get-all-brands')).data;
};