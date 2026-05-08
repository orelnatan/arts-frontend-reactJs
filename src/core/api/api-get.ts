const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Native Fetch wrapper for GET requests
 * @param {string} endpoint - The API path
 * @param {Record<string, string | number>} [params] - Optional object for query parameters
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response
 */
export const apiGet = async <T>(
  endpoint: string, 
  params?: Record<string, string | number>
): Promise<T> => {
  // Handle query parameters if they exist
  const queryString = params 
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}` 
    : '';

  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Get request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};