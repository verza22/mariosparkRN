import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function Login(userName, password) {
  return dispatch => {
    axiosRequest({dispatch, url: 'auth/Login', params: { userName, password }})
    .then(res=>{
      if(res.user.id > 0){
        dispatch(DataSuccess());
        dispatch({
          type: LOGIN,
          user: res.user,
          token: res.token
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