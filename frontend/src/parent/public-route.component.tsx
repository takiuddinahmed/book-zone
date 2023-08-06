import { ReactNode } from "react";
import { PublicLayout } from "./public-layout.component";

interface PublicRouteProps {
  children?: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  return <PublicLayout>{children}</PublicLayout>;
}
