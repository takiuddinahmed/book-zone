import { ReactNode } from "react";
import { useAuth } from "../user/useAuth.hook";
import { useNavigate } from "react-router-dom";
import { AdminDashboardLayout } from "./admin-dashboard-layout.component";

interface PrivateRouteProps {
  children?: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  if (!isLoggedIn) navigate("/login");

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
