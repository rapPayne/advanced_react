import { createContext, ReactElement, ReactNode } from "react"
import { AuthHookType, useAuth } from "../hooks/useAuth"
const initialValue: AuthHookType = {
  isAuthenticated: false,
  user: undefined,
  login: (u, p) => undefined,
  logout: () => undefined,
}
export const AuthContext = createContext<AuthHookType>(initialValue);
export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}