const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";

export const apiBaseUrl = rawApiBaseUrl || null;
export const isApiEnabled = Boolean(apiBaseUrl);
