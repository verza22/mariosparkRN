import CryptoJS from "rn-crypto-js";
import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';
import { transformArrayToObject } from './../../components/lib/util';

export const LOGIN = 'LOGIN';
export const LOGIN_WITHOUT_ETHERNET = 'LOGIN_WITHOUT_ETHERNET';
export const LOGOUT = 'LOGOUT';
export const OFFLINE_MODE = 'OFFLINE_MODE';
export const UPDATE_USER_FCM_TOKEN = 'UPDATE_USER_FCM_TOKEN';
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';

export function Login(userName, password, callback) {
  return (dispatch, getState) => {
    axiosRequest({dispatch, getState, url: 'auth/Login', params: { userName, password }})
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
        callback(res.user.id);
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

export function HandleOfflineMode(mode) {
  return {
    type: OFFLINE_MODE,
    mode
  };
}

export function UpdateUserToken(id, token) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'user/UpdateUserToken',
      params: {
        userID: id,
        token
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res>0){
        console.log("fcm token almacenado con exito en server y app")
        dispatch({
          type: UPDATE_USER_FCM_TOKEN,
          token
        });
      }else{
        dispatch(DataFailure("Fallo al guardar el fcm token en el servidor"));
      }
    })
  }
}

export function UpdateUserPassword(id, password, callback) {
  return (dispatch, getState) => {
    if(password !== ""){
      password = CryptoJS.SHA1(password).toString();
    }
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'user/UpdateUserPassword',
      params: {
        userID: id,
        password
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: UPDATE_USER_PASSWORD,
          password
        });
        callback();
      }
    })
  }
}