import { useState } from "react";
import { useUpdateStep } from "~/hooks/use-update-step";
import { useDeleteStep } from "~/hooks/use-delete-step";

export const StepCard = ({ step }: any) => {
  const [form, setForm] = useState(step);

  const { mutate: saveStep } = useUpdateStep(step.id);
  const { mutate: deleteStep } = useDeleteStep(step.id, step.experienceId);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border-2 p-4 rounded-lg bg-white dark:bg-gray-900 mb-3">
      <input
        className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-800"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <textarea
        className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-800"
        value={form.clueText}
        onChange={(e) => handleChange("clueText", e.target.value)}
      />

      <select
        className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-800"
        value={form.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="text">Texto</option>
        <option value="number">Número</option>
        <option value="qr">Código QR</option>
      </select>

      <input
        className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-800"
        placeholder="Answer"
        type={form.type}
        value={form.answer}
        onChange={(e) => handleChange("answer", e.target.value)}
      />

      <button
        className="bg-primary text-white px-3 py-2 rounded mr-2"
        onClick={() => saveStep(form)}
      >
        Save
      </button>

      <button
        className="border-2 text-white px-3 py-2 rounded"
        onClick={() => deleteStep()}
      >
        Delete
      </button>
    </div>
  );
};
