import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';

export function GetCustomers(token, storeID) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'customer/getCustomers',
      token,
      params: {
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res.length > 0){
        dispatch({
          type: GET_CUSTOMERS,
          customers: res
        });
      }
    })
  }
}

export function RemoveCustomer(token, id, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'customer/RemoveCustomer',
      token,
      params: {
        customerID: id
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: REMOVE_CUSTOMER,
          id
        });
        callback();
      }
    })
  }
}
  
export function UpdateCustomer(token, id, name, dni, email, phone, address, storeID, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'customer/AddOrUpdateCustomer',
      token,
      params: {
        id,
        name,
        dni,
        email,
        phone,
        address,
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: UPDATE_CUSTOMER,
          id,
          name,
          dni,
          email,
          phone,
          address
        });
        callback();
      }
    })
  }
}

export function AddCustomer(token, name, dni, email, phone, address, storeID, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'customer/AddOrUpdateCustomer',
      token,
      params: {
        id: 0,
        name,
        dni,
        email,
        phone,
        address,
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: ADD_CUSTOMER,
          id: res,
          name,
          dni,
          email,
          phone,
          address
        });
        callback();
      }
    })
  }
}