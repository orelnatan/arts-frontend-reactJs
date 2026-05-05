import { useState } from 'react';
import axios from 'axios'; 

import { authLogin } from '../api';
import type { LoginFormValues } from '../models';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authLogin(values);
      setLoading(false);
      return response.data; 
    } catch (err) {
      setLoading(false);

      const message = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Login failed' 
        : 'An unexpected error occurred';
      
      setError(message);
      
      throw err; 
    }
  };

  return { login, loading, error };
};