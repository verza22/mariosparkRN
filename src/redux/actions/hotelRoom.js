import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_HOTEL_ROOMS = 'GET_HOTEL_ROOMS';
export const REMOVE_HOTEL_ROOM = 'REMOVE_HOTEL_ROOM';
export const UPDATE_HOTEL_ROOM = 'UPDATE_HOTEL_ROOM';
export const ADD_HOTEL_ROOM = 'ADD_HOTEL_ROOM';

export function GetHotelRooms(token, storeID) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'hotelRoom/getHotelRooms',
      token,
      params: {
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res.length > 0){
        dispatch({
          type: GET_HOTEL_ROOMS,
          hotelRooms: res
        });
      }
    })
  }
}

export function RemoveHotelRoom(token, id, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'hotelRoom/RemoveHotelRoom',
      token,
      params: {
        roomID: id
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: REMOVE_HOTEL_ROOM,
          id
        });
        callback();
      }
    })
  }
}

export function UpdateHotelRoom(token, id, name, capacity, typeAux, storeID, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'hotelRoom/AddOrUpdateHotelRoom',
      token,
      params: {
        id,
        name,
        capacity,
        roomType: typeAux,
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: UPDATE_HOTEL_ROOM,
          id,
          name,
          capacity,
          typeAux
        });
        callback();
      }
    })
  }
}
  
export function AddHotelRoom(token, name, capacity, typeAux, storeID, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'hotelRoom/AddOrUpdateHotelRoom',
      token,
      params: {
        id: 0,
        name,
        capacity,
        roomType: typeAux,
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: ADD_HOTEL_ROOM,
          id: res,
          name,
          capacity,
          typeAux
        });
        callback();
      }
    })
  }
}