import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { sign } from "crypto";

export default [
  index("routes/home.tsx"),
  route("signin", "routes/sign-in.tsx"),
  route("create-account", "routes/create-account.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
