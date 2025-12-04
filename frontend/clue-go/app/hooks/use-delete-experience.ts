import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, getAuthHeaders } from "../lib/api";
import { toast } from "sonner";

export const useDeleteExperience = (stepId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/api/experiences/${stepId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        toast.error("Error deleting expereince");
        throw new Error("Error deleting expereince");
      }
      toast.success("experiences delete");
      return res.json();
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experience-editor"], exact: false });
    },
  });
};
