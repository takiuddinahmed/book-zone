import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RegisterPage } from "./user/register.page";
import { LoginPage } from "./user/login.page";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
