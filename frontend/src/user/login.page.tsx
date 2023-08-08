import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { trpc } from "../lib/trpc";
import { useAuth } from "./useAuth.hook";
import { IUser } from "backend/src/user/user.model";

export function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const loginMutation = trpc.user.login.useMutation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userLoginData = {
      email: (data.get("email") as string) || "",
      password: (data.get("password") as string) || "",
    };

    loginMutation.mutate(userLoginData);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/category");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      toast.success("Login successful");
      login(loginMutation.data.token, loginMutation.data.user as IUser);
    } else if (loginMutation.error) {
      toast.error("Failed to login");
    }
  }, [loginMutation]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Grid item>
                {/* <MuiLink href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </MuiLink> */}
              </Grid>
              <Link to="/register">
                <MuiLink variant="body2">
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MuiLink color="inherit" component={Link} to="/">
        Book Zone
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
