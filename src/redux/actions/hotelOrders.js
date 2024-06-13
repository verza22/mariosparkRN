import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_HOTEL_ORDERS = 'GET_HOTEL_ORDERS';
export const REMOVE_HOTEL_ORDER = 'REMOVE_HOTEL_ORDER';
export const UPDATE_HOTEL_ORDER = 'UPDATE_HOTEL_ORDER';
export const ADD_HOTEL_ORDER = 'ADD_HOTEL_ORDER';

export function GetHotelOrders(token, storeID) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'hotelOrder/GetHotelOrders',
      token,
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

export function RemoveHotelOrder(token, id, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'hotelOrder/RemoveHotelOrder',
      token,
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

export function UpdateHotelOrder(token,id,userID,total,dateIN,dateOUT,paymentMethod,people,room,customer,storeID,callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'hotelOrder/AddOrUpdateHotelOrder',
      token,
      params: {
        orderID: id,
        userID,
        total,
        dateIN,
        dateOUT,
        paymentMethod,
        people,
        storeID,
        customer: JSON.stringify(customer),
        room: JSON.stringify(room)
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: UPDATE_HOTEL_ORDER,
          id,
          userID,
          total,
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
  
export function AddHotelOrder(token,userID,total,dateIN,dateOUT,paymentMethod,people,room,customer,storeID,callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'hotelOrder/AddOrUpdateHotelOrder',
      token,
      params: {
        orderID: 0,
        userID,
        total,
        dateIN,
        dateOUT,
        paymentMethod,
        people,
        storeID,
        customer: JSON.stringify(customer),
        room: JSON.stringify(room)
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: ADD_HOTEL_ORDER,
          userID,
          total,
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