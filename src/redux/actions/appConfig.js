import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';
import { transformArrayToObject } from './../../components/lib/util';

export const LOGIN = 'LOGIN';
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
          hotelOrderType
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