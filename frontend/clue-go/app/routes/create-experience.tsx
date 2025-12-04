import type { Route } from "./+types/home";
import { ProtectedRoute } from "~/components/auth/protected-route";
import { CreateExperienceComponent } from "~/components/create-experiences-component/create-experiences-component";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ClueGo - Create Experience" },
    { name: "description", content: "Create an Expereince" },
  ];
}

export default function CreateExperience() {
  return (
    <>
      <ProtectedRoute>
        <CreateExperienceComponent />
      </ProtectedRoute>
    </>
  );
}
