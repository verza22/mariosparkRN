export const REMOVE_HOTEL_ROOM = 'REMOVE_HOTEL_ROOM';
export const UPDATE_HOTEL_ROOM = 'UPDATE_HOTEL_ROOM';
export const ADD_HOTEL_ROOM = 'ADD_HOTEL_ROOM';


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