import { INVALID_AUTH_SESSION_LABEL } from "@arts/auth.consts";

import type { RequestOptions } from "../models";
import { getAuthHeaders } from "./get-auth-headers.util";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Native Fetch wrapper for PATCH requests
 * @param {string} endpoint - The API path
 * @param {unknown} body - The data to be stringified and sent in the request body
 * @param {Omit<RequestOptions, 'params'>} [options] - Configuration for custom headers
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response
 * @template T - The expected return type of the response data
 */
export const patch = async <T>(
  endpoint: string,
  body: unknown,
  options: Omit<RequestOptions, 'params'> = {}
): Promise<T> => {
  const { headers } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PATCH',
    headers: getAuthHeaders(headers),
    body: JSON.stringify(body),
  });

  if (response.status === 403) {
    window.dispatchEvent(new Event(INVALID_AUTH_SESSION_LABEL));
    throw new Error('Session expired. Please log in again.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Patch request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};