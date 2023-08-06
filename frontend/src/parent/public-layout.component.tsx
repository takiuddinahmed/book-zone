import { ReactNode } from "react";
import { PublicNavbar } from "./public-navbar.coponent";

export function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
}
