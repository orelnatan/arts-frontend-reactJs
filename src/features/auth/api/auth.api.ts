import { api } from "@arts/core"; 

import { type LoginJwt, type LoginFormValues } from "../models";

export const authLogin = (credentials: LoginFormValues) => {
  return api.POST<LoginJwt>('/login', credentials);
};