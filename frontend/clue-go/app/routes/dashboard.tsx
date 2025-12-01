import { DashboardComponent } from "~/components/dashboard-component/dashboard-component";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ClueGo - Dashboard" },
    { name: "description", content: "Dashboard ClueGo!" },
  ];
}
export const Dashboard = () => {
  return <DashboardComponent />;
};
