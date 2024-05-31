// reducer.js
import { REMOVE_HOTEL_ORDER, UPDATE_HOTEL_ORDER, ADD_HOTEL_ORDER } from './../actions/hotelOrders';

import { hotelOrders } from './../../data';

const initialState = {
    hotelOrders: hotelOrders
};

function reducer(state = initialState, action) {
  switch (action.type) {
      case REMOVE_HOTEL_ORDER:
        return {
          ...state,
          hotelOrders: state.hotelOrders.filter(x=> x.id !== action.id)
        };
      case UPDATE_HOTEL_ORDER:
        let hotelOrders = state.hotelOrders.map(order => {
          if (order.id === action.id) {
            return {
                ...order,
                userID: action.userID,
                total: action.total,
                dateIN: action.dateIN,
                dateOUT: action.dateOUT,
                paymentMethod: action.paymentMethod,
                people: action.people,
                room: action.room,
                customer: action.customer
            };
          }
          return order;
        });
        return {
          ...state,
          hotelOrders: hotelOrders
        };
      case ADD_HOTEL_ORDER:
        let maxCId = Math.max.apply(Math, state.hotelOrders.map(x=> x.id));
        return {
          ...state,
          hotelOrders: [...state.hotelOrders,
            { 
                id: maxCId+1, 
                userID: action.userID,
                total: action.total,
                dateIN: action.dateIN,
                dateOUT: action.dateOUT,
                paymentMethod: action.paymentMethod,
                people: action.people,
                room: action.room,
                customer: action.customer
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
