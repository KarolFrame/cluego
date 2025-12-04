import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, getAuthHeaders } from "../lib/api";

export const useUpdateExperience = (id: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch(`${API_URL}/api/experiences/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error updating experience");

      return res.json();
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experience-editor", id] });
    },
  });
};
