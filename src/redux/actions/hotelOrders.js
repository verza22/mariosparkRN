import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_HOTEL_ORDERS = 'GET_HOTEL_ORDERS';
export const REMOVE_HOTEL_ORDER = 'REMOVE_HOTEL_ORDER';
export const UPDATE_HOTEL_ORDER = 'UPDATE_HOTEL_ORDER';
export const ADD_HOTEL_ORDER = 'ADD_HOTEL_ORDER';
export const ADD_HOTEL_ORDER_WITHOUT_ETHERNET = 'ADD_HOTEL_ORDER_WITHOUT_ETHERNET';

export function GetHotelOrders(storeID) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelOrder/GetHotelOrders',
      params: {
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res.length > 0){
        dispatch({
          type: GET_HOTEL_ORDERS,
          hotelOrders: res
        });
      }
    })
  }
}

export function RemoveHotelOrder(id, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelOrder/RemoveHotelOrder',
      params: {
        orderID: id
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: REMOVE_HOTEL_ORDER,
          id
        });
        callback();
      }
    })
  }
}

export function UpdateHotelOrder(id,userID,total,cantBabies,cantChildren,cantAdult,dateInMask,dateOutMask, dateIN, dateOUT,paymentMethod,people,room,customer,storeID,callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelOrder/AddOrUpdateHotelOrder',
      params: {
        orderID: id,
        userID,
        total,
        cantBabies,
        cantChildren,
        cantAdult,
        dateIN: dateInMask,
        dateOUT: dateOutMask,
        paymentMethod,
        people,
        storeID,
        customer: JSON.stringify(customer),
        room: JSON.stringify(room)
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: UPDATE_HOTEL_ORDER,
          id,
          userID,
          total,
          cantBabies,
          cantChildren,
          cantAdult,
          dateIN,
          dateOUT,
          paymentMethod,
          people,
          room,
          customer
        });
        callback();
      }
    })
  }
}
  
export function AddHotelOrder(userID,total,cantBabies,cantChildren,cantAdult,dateInMask,dateOutMask, dateIN, dateOUT,paymentMethod,people,room,customer,storeID,callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelOrder/AddOrUpdateHotelOrder',
      params: {
        orderID: 0,
        userID,
        total,
        cantBabies,
        cantChildren,
        cantAdult,
        dateIN: dateInMask,
        dateOUT: dateOutMask,
        paymentMethod,
        people,
        storeID,
        customer: JSON.stringify(customer),
        room: JSON.stringify(room)
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: ADD_HOTEL_ORDER,
          id: res,
          userID,
          total,
          cantBabies,
          cantChildren,
          cantAdult,
          dateIN,
          dateOUT,
          paymentMethod,
          people,
          room,
          customer
        });
        callback(res);
      }
    })
    .catch(err=>{
      dispatch({
        type: ADD_HOTEL_ORDER_WITHOUT_ETHERNET,
        userID,
        total,
        cantBabies,
        cantChildren,
        cantAdult,
        dateIN,
        dateOUT,
        paymentMethod,
        people,
        room,
        customer,
        storeID,
        dateInMask,
        dateOutMask
      });
      callback('');
    })
  }
}