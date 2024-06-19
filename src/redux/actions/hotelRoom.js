import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_HOTEL_ROOMS = 'GET_HOTEL_ROOMS';
export const REMOVE_HOTEL_ROOM = 'REMOVE_HOTEL_ROOM';
export const UPDATE_HOTEL_ROOM = 'UPDATE_HOTEL_ROOM';
export const ADD_HOTEL_ROOM = 'ADD_HOTEL_ROOM';

export function GetHotelRooms(storeID) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelRoom/getHotelRooms',
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

export function RemoveHotelRoom(id, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelRoom/RemoveHotelRoom',
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

export function UpdateHotelRoom(id, name, capacity, typeAux, storeID, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelRoom/AddOrUpdateHotelRoom',
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
  
export function AddHotelRoom(name, capacity, typeAux, storeID, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelRoom/AddOrUpdateHotelRoom',
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