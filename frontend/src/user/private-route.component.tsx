import { ReactNode } from "react";
import { useAuth } from "./useAuth.hook";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children?: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  if (!isLoggedIn) navigate("/login");

  return <>{children}</>;
}
