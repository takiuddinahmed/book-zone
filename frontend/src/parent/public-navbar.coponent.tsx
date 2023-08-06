import {
  AppBar,
  Button,
  Link as MuiLink,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../user/useAuth.hook";

export function PublicNavbar() {
  const { isLoggedIn } = useAuth();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Book Zone
        </Typography>
        <nav>
          <MuiLink
            color="text.primary"
            component={RouterLink}
            to={"/"}
            sx={{ my: 1, mx: 1.5, fontWeight: "bold", textDecoration: "none" }}
          >
            CATEGORIES
          </MuiLink>
          <MuiLink
            color="text.primary"
            component={RouterLink}
            to={"/"}
            sx={{ my: 1, mx: 1.5, fontWeight: "bold", textDecoration: "none" }}
          >
            AUTHORS
          </MuiLink>
        </nav>
        {isLoggedIn && (
          <Button
            component={RouterLink}
            variant="outlined"
            to={"/admin/book"}
            sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
          >
            DASHBOARD
          </Button>
        )}
        {!isLoggedIn && (
          <Button
            component={RouterLink}
            variant="outlined"
            to={"/login"}
            sx={{ my: 1, mx: 1.5 }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
