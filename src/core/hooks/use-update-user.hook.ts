import { useState, useCallback } from 'react';

import { updateUser } from '../api';
import { type User } from '../models';

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerUpdate = useCallback(async (user: User): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      const data = await updateUser(user);
      
      return data;
    } catch (err: unknown) {
      setError(String(err));
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { triggerUpdate, loading, error };
};