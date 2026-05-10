import { useState } from 'react';

const AUTH_TOKEN_KEY = "auth_token";

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });

  const saveToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  };

  return {
    token,
    setToken: saveToken,
    removeToken
  };
};