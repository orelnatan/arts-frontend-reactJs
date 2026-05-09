import { useState, useCallback } from 'react';

import { getUserByToken } from '../api';
import { type User } from '../models';

export const useFetchUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (token: string): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      const data = await getUserByToken(token);

      return data; 
    } catch (err: unknown) {
      setError(String(err));

      throw err; 
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchUser, loading, error };
};
