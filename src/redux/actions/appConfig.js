import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';
import { transformArrayToObject } from './../../components/lib/util';

export const LOGIN = 'LOGIN';
export const LOGIN_WITHOUT_ETHERNET = 'LOGIN_WITHOUT_ETHERNET';
export const LOGOUT = 'LOGOUT';

export function Login(userName, password) {
  return dispatch => {
    axiosRequest({dispatch, url: 'auth/Login', params: { userName, password }})
    .then(res=>{
      if(res.user.id > 0){
        dispatch(DataSuccess());

        const userType = transformArrayToObject(res.userTypes);
        const orderStatus = transformArrayToObject(res.orderStatusList);
        const hotelOrderType = transformArrayToObject(res.hotelOrderTypeList);

        dispatch({
          type: LOGIN,
          user: res.user,
          token: res.token,
          hotelRoomTypes: res.hotelRoomTypeList,
          userTypeList: res.userTypes,
          userType,
          orderStatus,
          hotelOrderType,
          password
        });
      }else{
        dispatch(DataFailure("Usuario o contraseña incorrecto"));
      }
    })
    .catch(err=>{
      dispatch({
        type: LOGIN_WITHOUT_ETHERNET,
        userName,
        password
      });
    })
  }
}

export function Logout() {
  return {
    type: LOGOUT
  };
}