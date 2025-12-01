import { CreateAccountComponent } from "~/components/create-account-component/create-account-component";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ClueGo - Create an Account" },
    { name: "description", content: "Create an Account ClueGo!" },
  ];
}

export default function CreateAccount() {
  return <CreateAccountComponent />;
}
