import { User } from '../types/User';
import { login as repoLogin, register as repoRegister } from './repository';

export const login = (username: string, password: string) => {
  return repoLogin(username, password)
}

export const register = (user: User) => {
  return repoRegister(user)
}
