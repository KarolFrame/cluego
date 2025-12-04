import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, getAuthHeaders } from "../lib/api";

export const useDeleteStep = (stepId: number, experienceId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/api/steps/${stepId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Error deleting step");
      return res.json();
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experience-editor"], exact: false });
    },
  });
};
