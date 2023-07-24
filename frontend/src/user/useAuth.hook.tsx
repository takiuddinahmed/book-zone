import { useContext, useEffect, useState } from "react";
import { UserContext } from "./auth.provider";
import { IUser } from "backend/src/user/user.model";

export function useAuth() {
  const { authInfo, setAuthInfo } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authInfo && authInfo.token && authInfo.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authInfo]);

  const login = (token: string, user: IUser) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    if (setAuthInfo)
      setAuthInfo({
        token,
        user,
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (setAuthInfo) setAuthInfo(null);
  };

  return {
    login,
    logout,
    isLoggedIn,
    user: authInfo?.user,
    token: authInfo?.token,
  };
}
