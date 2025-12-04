import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, getAuthHeaders } from "../lib/api";

export const useUpdateStep = (stepId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch(`${API_URL}/api/steps/${stepId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error updating step");
      return res.json();
    },

    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["experience-editor", variables.experienceId],
      });
    },
  });
};
