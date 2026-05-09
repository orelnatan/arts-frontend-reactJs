import { useState } from 'react';

const ACCESS_TOKEN_KEY = "access_token";

export const useAccessToken = () => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  });

  const saveToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setToken(null);
  };

  return {
    token,
    setToken: saveToken,
    removeToken
  };
};