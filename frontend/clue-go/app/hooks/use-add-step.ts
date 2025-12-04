import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, getAuthHeaders } from "../lib/api";

export const useAddStep = (experienceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch(`${API_URL}/api/steps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          ...payload,
          experienceId: Number(experienceId),
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experience-editor", experienceId],
      });
    },
  });
};
