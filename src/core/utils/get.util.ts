import { INVALID_AUTH_SESSION_LABEL } from '@arts/auth.consts'

import type { RequestOptions } from '../models'
import { getAuthHeaders } from './get-auth-headers.util'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Native Fetch wrapper for GET requests
 * @param {string} endpoint - The API path
 * @param {RequestOptions} [options] - Configuration for params and headers
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response
 */
export const get = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { params, headers } = options

  const queryString = params
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
    : ''

  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    method: 'GET',
    headers: getAuthHeaders(headers),
  })

  if (response.status === 403) {
    window.dispatchEvent(new Event(INVALID_AUTH_SESSION_LABEL))
    throw new Error('Session expired. Please log in again.')
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || `Get request failed: ${response.status}`
    )
  }

  return response.json() as Promise<T>
}
