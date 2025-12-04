import type { Route } from "./+types/home";
import { UserProfileComponent } from "~/components/user-profile/user-profile-component";
import { ProtectedRoute } from "~/components/auth/protected-route";
import ExperienceEditorComponent from "~/components/experience-editor-component/experience-editor-component";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ClueGo - Experience Esditor" },
    { name: "description", content: "Experience Editor" },
  ];
}

export default function ExperienceEditor() {
  return (
    <>
      <ProtectedRoute>
        <ExperienceEditorComponent />
      </ProtectedRoute>
    </>
  );
}
