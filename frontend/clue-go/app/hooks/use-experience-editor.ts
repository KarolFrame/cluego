import { useQuery } from "@tanstack/react-query";
import { API_URL, getAuthHeaders } from "../lib/api";

export const useExperienceEditor = (id: string) => {
  return useQuery({
    queryKey: ["experience-editor", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/experiences/${id}/editor`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Error loading experience");

      const data = await res.json();
      return data.experience ?? data;
    },
  });
};
