import { API_CONFIG } from "../config/env";

export function getApiUrl(endpoint: string) {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_CONFIG.baseUrl}${cleanEndpoint}`;
}