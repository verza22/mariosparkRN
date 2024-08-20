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

export function UpdateHotelRoom(id, name, capacity, typeAux, storeID, priceBabies, priceChildren, priceAdults, image, description, callback) {
  return (dispatch, getState) => {

    const state = getState();
    const token = state.appConfigReducer.token;

    let changeImage = typeof image !== "string";

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: 'image.jpg'
    });
    formData.append('id', id);
    formData.append('name', name);
    formData.append('roomType', typeAux);
    formData.append('storeID', storeID);
    formData.append('priceBabies', priceBabies);
    formData.append('priceChildren', priceChildren);
    formData.append('priceAdults', priceAdults);
    formData.append('description', description);
    formData.append('changeImage', changeImage);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelRoom/AddOrUpdateHotelRoom',
      headers,
      params: formData
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: UPDATE_HOTEL_ROOM,
          id,
          name,
          capacity,
          typeAux,
          priceBabies,
          priceChildren,
          priceAdults,
          image,
          description
        });
        callback();
      }
    })
  }
}
  
export function AddHotelRoom(name, capacity, typeAux, storeID, priceBabies, priceChildren, priceAdults, image, description, callback) {
  return (dispatch, getState) => {


    const state = getState();
    const token = state.appConfigReducer.token;

    let changeImage = typeof image !== "string";

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: 'image.jpg'
    });
    formData.append('id', 0);
    formData.append('name', name);
    formData.append('roomType', typeAux);
    formData.append('storeID', storeID);
    formData.append('priceBabies', priceBabies);
    formData.append('priceChildren', priceChildren);
    formData.append('priceAdults', priceAdults);
    formData.append('description', description);
    formData.append('changeImage', true);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'hotelRoom/AddOrUpdateHotelRoom',
      headers,
      params: formData
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: ADD_HOTEL_ROOM,
          id: res,
          name,
          capacity,
          typeAux,
          priceBabies,
          priceChildren,
          priceAdults,
          image,
          description
        });
        callback();
      }
    })
  }
}