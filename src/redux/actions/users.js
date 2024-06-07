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

export function RemoveUser(id) {
    return {
      type: REMOVE_USER,
      id
    };
  }
  
  export function UpdateUser(id, user, name, password, userType) {
    return {
      type: UPDATE_USER,
      id,
      user,
      name,
      password,
      userType
    };
  }
  
  export function AddUser(user, name, password, userType) {
    return {
      type: ADD_USER,
      user,
      name,
      password,
      userType
    };
  }