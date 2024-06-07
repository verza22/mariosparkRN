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

export function RemoveHotelRoom(id) {
    return {
      type: REMOVE_HOTEL_ROOM,
      id
    };
  }
  
  export function UpdateHotelRoom(id, name, capacity, typeAux) {
    return {
      type: UPDATE_HOTEL_ROOM,
      id,
      name,
      capacity,
      typeAux
    };
  }
  
  export function AddHotelRoom(name, capacity, typeAux) {
    return {
      type: ADD_HOTEL_ROOM,
      name,
      capacity,
      typeAux
    };
  }