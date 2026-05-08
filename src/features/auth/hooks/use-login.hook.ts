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
      setLoading(false);

      return data; 
    } catch (err: unknown) {
      setLoading(false);
      setError(String(err));

      throw err; 
    }
  };

  return { login, loading, error };
};