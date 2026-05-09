import { api } from "@arts/core";

import { type User } from "../models"; 

export const getUserByToken = (token: string) => {
  return api.GET<User>('/fetch-user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};