export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};
