import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_PRINTERS = 'GET_PRINTERS';
export const REMOVE_PRINTER = 'REMOVE_PRINTER';
export const UPDATE_PRINTER = 'UPDATE_PRINTER';
export const ADD_PRINTER = 'ADD_PRINTER';

export function GetPrinters(storeID) {
  return (dispatch, getState) => {
    console.log('test: '+storeID)
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'printer/getPrinters',
      params: {
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res.length > 0){
        dispatch({
          type: GET_PRINTERS,
          printers: res
        });
      }
    })
  }
}

export function RemovePrinter(id, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'printer/RemovePrinter',
      params: {
        printerID: id
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: REMOVE_PRINTER,
          id
        });
        callback();
      }
    })
  }
}

export function UpdatePrinter(id, name, ip, isPrincipal, storeID, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'printer/AddOrUpdatePrinter',
      params: {
        id,
        name,
        ip,
        isPrincipal,
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: UPDATE_PRINTER,
          id,
          name,
          ip,
          isPrincipal,
          storeID
        });
        callback();
      }
    })
  }
}

export function AddPrinter(name, ip, isPrincipal, storeID, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'printer/AddOrUpdatePrinter',
      params: {
        id: 0,
        name,
        ip,
        isPrincipal,
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: ADD_PRINTER,
          id: res,
          name,
          ip,
          isPrincipal,
          storeID
        });
        callback();
      }
    })
  }
}