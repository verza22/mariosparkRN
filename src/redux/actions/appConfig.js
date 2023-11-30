export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function Login(user) {
  return {
    type: LOGIN,
    user
  };
}

export function Logout() {
  return {
    type: LOGOUT
  };
}