import type { RequestOptions } from "../models";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Native Fetch wrapper for GET requests
 * @param {string} endpoint - The API path
 * @param {RequestOptions} [options] - Configuration for params and headers
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response
*/
export const get = async <T>(
  endpoint: string, 
  options: RequestOptions = {} // Use an options object
): Promise<T> => {
  const { params, headers } = options;

  const queryString = params 
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}` 
    : '';

  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers, // Merge custom headers (like Authorization)
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Get request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};