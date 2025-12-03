import { Navigate } from "react-router";
import { useAuth } from "~/context/auth-context";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
