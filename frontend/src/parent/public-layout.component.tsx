import { ReactNode } from "react";
import { PublicNavbar } from "./public-navbar.coponent";
import { Container } from "@mui/material";

export function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <PublicNavbar />
      <Container maxWidth="xl" sx={{ my: 4 }}>
        {children}
      </Container>
    </>
  );
}
