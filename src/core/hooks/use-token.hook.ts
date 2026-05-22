import { useState } from 'react';

const TOKEN_KEY = "auth_token";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return {
    token,
    setToken: saveToken,
    removeToken
  };
};