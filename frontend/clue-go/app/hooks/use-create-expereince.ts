import { useMutation } from "@tanstack/react-query";
import { API_URL, getAuthHeaders } from "../lib/api";

type StepInput = {
  title: string;
  clueText?: string;
  type: string;
  answer?: string;
  hint?: string;
  timeLimit?: number;
  order: number;
};

type CreateExperienceInput = {
  title: string;
  description?: string;
  mode: "classic" | "custom" | "outdoor";
  difficulty?: string;
  imageUrl?: string | null;
  steps?: StepInput[];
};

type CreateExperienceResponse = {
  experience: {
    id: number;
    title: string;
    description?: string;
    imageUrl?: string | null;
    difficulty?: string;
    mode: string;
    accessCode?: string | null;
    isPublished: boolean;
    ownerId: number;
  };
};

export const useCreateExperience = () => {
  return useMutation<CreateExperienceResponse, Error, CreateExperienceInput>({
    mutationFn: async (payload) => {
      const res = await fetch(`${API_URL}/api/experiences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error creating experience");
      }

      return res.json();
    },
  });
};
