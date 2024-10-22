import toast from 'react-hot-toast';
import { login as loginToServer } from '../data/authentication';
import { useState } from 'react';
import { User } from '../types/User';

export type AuthHookType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  user: User | undefined;
}
export function useAuth(): AuthHookType {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (username: string, password: string): void => {

    loginToServer(username, password)
      .then(user => (setUser(user), user))
      .then(user => toast.success(`Welcome ${user?.first}`))
      .then(() => setIsAuthenticated(true))
      .catch(err => toast.error(`Can't log in. ${err.message}`));
  }
  const logout = (): void => {
    setUser(undefined);
    setIsAuthenticated(false);
  }
  return { isAuthenticated, login, logout, user };
}