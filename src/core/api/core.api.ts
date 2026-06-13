import { api } from "@arts/core";

import { Locale, Theme, type User, type UserUpdateSuccess } from "../models"; 

export const fetchUser = (): Promise<User> => {
  return api.GET<User>('/fetch-user');
};

export const updateTheme = (theme: Theme): Promise<UserUpdateSuccess> => {
  return api.PATCH<UserUpdateSuccess>('/update-theme', { theme });
};

export const updateLocale = (locale: Locale): Promise<UserUpdateSuccess> => {
  return api.PATCH<UserUpdateSuccess>('/update-locale', { locale });
};