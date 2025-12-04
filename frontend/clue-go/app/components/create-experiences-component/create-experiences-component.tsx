import React, { useState } from "react";
import { data, useNavigate } from "react-router";
import { useCreateExperience } from "~/hooks/use-create-expereince";

export const CreateExperienceComponent = () => {
  const navigate = useNavigate();
  const createExperience = useCreateExperience();

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "",
    mode: "classic" as "classic" | "custom" | "outdoor",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExperience.mutate(form, {
      onSuccess: (data) => {
        navigate(`/experience-editor/${data.experience.id}`);
      },
    });
  };

  return (
    <>
      <div className="container mx-auto p-6 pt-20">
        <h1 className="text-3xl font-bold mb-6">Crear experiencia</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800"
          />

          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800"
          />

          <input
            name="difficulty"
            placeholder="Dificultad"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800"
          />

          <select
            name="mode"
            value={form.mode}
            onChange={(e) => setForm({ ...form, mode: e.target.value as any })}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800"
          >
            <option value="official">Official</option>
            <option value="custom">Custom</option>
            <option value="outdoor">Outdoor</option>
          </select>

          <input
            name="imageUrl"
            placeholder="URL de imagen (opcional)"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800"
          />

          <button
            type="submit"
            className="w-full p-3 bg-primary text-white rounded-xl mt-4"
          >
            Crear experiencia
          </button>
        </form>
      </div>
    </>
  );
};
