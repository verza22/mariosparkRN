import CryptoJS from "rn-crypto-js";

import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_USERS = 'GET_USERS';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_USER = 'ADD_USER';

export function GetUsers(token, storeID) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'user/getUsers',
      token,
      params: {
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res.length > 0){
        dispatch({
          type: GET_USERS,
          users: res
        });
      }
    })
  }
}

export function RemoveUser(token, id, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'user/RemoveUser',
      token,
      params: {
        userID: id
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: REMOVE_USER,
          id
        });
        callback();
      }
    })
  }
}

export function UpdateUser(token, id, user, name, password, userType, storeID, callback) {
  return dispatch => {
    if(password !== ""){
      password = CryptoJS.SHA1(password).toString();
    }
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'user/AddOrUpdateUser',
      token,
      params: {
        id,
        user,
        name,
        password,
        userType,
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: UPDATE_USER,
          id,
          user,
          name,
          password,
          userType
        });
        callback();
      }
    })
  }
}

export function AddUser(token, user, name, password, userType, storeID, callback) {
  return dispatch => {
    if(password !== ""){
      password = CryptoJS.SHA1(password).toString();
    }
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'user/AddOrUpdateUser',
      token,
      params: {
        id: 0,
        user,
        name,
        password,
        userType,
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: ADD_USER,
          id: res,
          user,
          name,
          password,
          userType
        });
        callback();
      }
    })
  }
}