import { useState } from 'react';

import { authLogin } from '../api';
import type { LoginFormValues } from '../models';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authLogin(values);

      return data; 
    } catch (err: unknown) {
      setError(String(err));

      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};