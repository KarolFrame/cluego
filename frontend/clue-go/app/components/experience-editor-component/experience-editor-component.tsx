import { useParams } from "react-router";
import { useExperienceEditor } from "~/hooks/use-experience-editor";
import { LoaderComponent } from "../loader-component/loader-component";
import { IconComponent } from "../icon-component/icon-component";
import { useAddStep } from "~/hooks/use-add-step";
import { StepCard } from "../step-card/step-card";
import { useUpdateExperience } from "~/hooks/use-update-experience";

export default function ExperienceEditorComponent() {
  const { id } = useParams();

  const { data, isLoading } = useExperienceEditor(id!);

  const addStepMutation = useAddStep(id!);

  const exp = data;

  const handleAddStep = () => {
    addStepMutation.mutate({
      title: "New Step",
      type: "text",
      order: data.steps.length,
      clueText: "",
      answer: "",
    });
  };

  const updateExperience = useUpdateExperience(id!);

  const handleSave = () => {
    updateExperience.mutate({
      title: (document.getElementById("title") as HTMLInputElement).value,
      description: (
        document.getElementById("description") as HTMLTextAreaElement
      ).value,
      mode: (document.getElementById("mode") as HTMLSelectElement).value,
    });
  };

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto flex flex-col items-center">
        {isLoading && <LoaderComponent />}
        {!isLoading && (
          <>
            <h1 className="text-3xl font-bold mb-4">Edit Experience</h1>
            <section className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow w-full">
              <h2 className="text-xl font-semibold mb-3">Basic info</h2>

              <input
                id="title"
                className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 mb-2"
                defaultValue={exp.title}
              />
              <textarea
                id="description"
                className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 mb-2"
                defaultValue={exp.description}
              />

              <select
                id="mode"
                className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 mb-2"
                defaultValue={exp.mode}
              >
                <option value="official">Official</option>
                <option value="custom">Custom</option>
                <option value="outdoor">Outdoor</option>
              </select>
              <button
                onClick={handleSave}
                className="mt-3 px-4 py-2 bg-primary text-white rounded-md"
              >
                Save experience
              </button>
            </section>

            <section className="mt-6 bg-white dark:bg-gray-900 p-4 rounded-xl shadow w-full">
              <h2 className="text-xl font-semibold mb-3">Steps</h2>

              {exp.steps.map((step: any) => (
                <StepCard step={step} key={step.id} />
              ))}

              <button
                className="mt-3 px-4 py-2 border-2 rounded-md flex gap-2"
                onClick={handleAddStep}
              >
                <IconComponent name="add" /> Add step
              </button>
            </section>
          </>
        )}
      </div>
    </>
  );
}
