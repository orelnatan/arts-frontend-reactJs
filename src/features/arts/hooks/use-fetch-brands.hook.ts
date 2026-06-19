import { useState, useCallback } from 'react';

import { fetchBrands } from '../api';
import type { Brand } from '../models';

export const useFetchBrands = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerFetch = useCallback(async (): Promise<Brand[]> => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchBrands();

      return data;
    } catch (err: unknown) {
      setError(String(err));

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { triggerFetch, loading, error };
};