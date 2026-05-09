const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Native Fetch wrapper for POST requests
 * @param {string} endpoint - The API path
 * @param {unknown} body - The data to be stringified and sent in the request body
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response
*/
export const post = async <T>(
  endpoint: string,
  body: unknown
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // You can add Authorization headers here later
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    // Attempt to extract server-side error message
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Post request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};