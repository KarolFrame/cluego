import { SignInComponent } from "~/components/sign-in-component/sign-in-component";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ClueGo - Sign In" },
    { name: "description", content: "Sign in ClueGo!" },
  ];
}

export default function SignIn() {
  return <SignInComponent />;
}
