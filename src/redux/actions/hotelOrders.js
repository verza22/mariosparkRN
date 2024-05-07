export const REMOVE_HOTEL_ORDER = 'REMOVE_HOTEL_ORDER';
export const UPDATE_HOTEL_ORDER = 'UPDATE_HOTEL_ORDER';
export const ADD_HOTEL_ORDER = 'ADD_HOTEL_ORDER';


export function RemoveHotelOrder(id) {
    return {
      type: REMOVE_HOTEL_ORDER,
      id
    };
  }
  
  export function UpdateHotelOrder(id,cashierID,total,dateIN,dateOUT,paymentMethod,people,room,customer) {
    return {
      type: UPDATE_HOTEL_ORDER,
      id,
      cashierID,
      total,
      dateIN,
      dateOUT,
      paymentMethod,
      people,
      room,
      customer
    };
  }
  
  export function AddHotelOrder(cashierID,total,dateIN,dateOUT,paymentMethod,people,room,customer) {
    return {
      type: ADD_HOTEL_ORDER,
      cashierID,
      total,
      dateIN,
      dateOUT,
      paymentMethod,
      people,
      room,
      customer
    };
  }