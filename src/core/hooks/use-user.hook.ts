import { useState, useCallback } from 'react';

import { getUserByToken } from '../api';
import { type User } from '../models';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = useCallback(async (token: string): Promise<User> => {
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

  return { getUser, loading, error };
};
