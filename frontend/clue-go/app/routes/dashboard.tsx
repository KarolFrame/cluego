import { DashboardComponent } from "~/components/dashboard-component/dashboard-component";
import type { Route } from "./+types/home";
import { ProtectedRoute } from "~/components/auth/protected-route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ClueGo - Dashboard" },
    { name: "description", content: "Dashboard ClueGo!" },
  ];
}
export default function Dashboard() {
  return (
    <>
      <ProtectedRoute>
        <DashboardComponent />
      </ProtectedRoute>
    </>
  );
}
