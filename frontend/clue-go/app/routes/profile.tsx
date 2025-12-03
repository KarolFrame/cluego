import type { Route } from "./+types/home";
import { MyProfile } from "~/components/my-profile/my-profile";
import { ProtectedRoute } from "~/components/auth/protected-route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ClueGo - My Profile" },
    { name: "description", content: "Your own profile" },
  ];
}

export default function Profile() {
  return (
    <>
      <ProtectedRoute>
        <MyProfile />
      </ProtectedRoute>
    </>
  );
}
