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

export function RemoveHotelOrder(id) {
    return {
      type: REMOVE_HOTEL_ORDER,
      id
    };
  }
  
  export function UpdateHotelOrder(id,userID,total,dateIN,dateOUT,paymentMethod,people,room,customer) {
    return {
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
    };
  }
  
  export function AddHotelOrder(userID,total,dateIN,dateOUT,paymentMethod,people,room,customer) {
    return {
      type: ADD_HOTEL_ORDER,
      userID,
      total,
      dateIN,
      dateOUT,
      paymentMethod,
      people,
      room,
      customer
    };
  }