import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RegisterPage } from "./user/register.page";
import { LoginPage } from "./user/login.page";
import { AdminCategoryList } from "./category/admin-category-list.component";
import { AdminAuthorList } from "./author/admin-author-list.component";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="admin/category" element={<AdminCategoryList />} />
        <Route path="admin/author" element={<AdminAuthorList />} />
      </Routes>
    </BrowserRouter>
  );
}
