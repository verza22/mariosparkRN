import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function Login(userName, password) {
  return dispatch => {
    axiosRequest(dispatch, 'auth/Login', { userName, password })
    .then(res=>{
      if(res.userId > 0){
        dispatch(DataSuccess());
        dispatch({
          type: LOGIN,
          user: res
        });
      }else{
        dispatch(DataFailure("Usuario o contraseña incorrecto"));
      }
    })
  }
}

export function Logout() {
  return {
    type: LOGOUT
  };
}