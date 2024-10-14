import { login as repoLogin, register as repoRegister } from './repository';

export const login = (username, password) => {
  return repoLogin(username, password)
}

export const register = (user) => {
  return repoRegister(user)
}

