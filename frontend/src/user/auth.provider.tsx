import { IUser } from "backend/src/user/user.model";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children?: ReactNode;
}

interface IAuthInfo {
  token?: string;
  user?: IUser;
}

export const UserContext = createContext<{
  authInfo?: IAuthInfo | null;
  setAuthInfo?: React.Dispatch<React.SetStateAction<IAuthInfo | null>>;
}>({});

export function AuthProvider({ children }: AuthProviderProps) {
  const [authInfo, setAuthInfo] = useState<IAuthInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    const user = localStorage.getItem("user") || null;
    if (!token || !user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthInfo(null);
    } else {
      setAuthInfo({ token, user: JSON.parse(user) as IUser });
    }
  }, []);

  return (
    <UserContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </UserContext.Provider>
  );
}
