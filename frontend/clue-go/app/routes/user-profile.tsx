import type { Route } from "./+types/home";
import { UserProfileComponent } from "~/components/user-profile/user-profile-component";
import { ProtectedRoute } from "~/components/auth/protected-route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ClueGo - User Profile" },
    { name: "description", content: "User profile" },
  ];
}

export default function Profile() {
  return (
    <>
      <ProtectedRoute>
        <UserProfileComponent />
      </ProtectedRoute>
    </>
  );
}
