
const TOKEN_KEY = "auth_token";

/**
 * Internal util to automatically attach the Bearer token to headers
 */
export const getAuthHeaders = (customHeaders?: Record<string, string>): Record<string, string> => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...customHeaders, 
  };
};