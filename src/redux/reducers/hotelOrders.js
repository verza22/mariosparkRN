import { GET_HOTEL_ORDERS, REMOVE_HOTEL_ORDER, UPDATE_HOTEL_ORDER, ADD_HOTEL_ORDER } from './../actions/hotelOrders';

const initialState = {
    hotelOrders: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_ORDERS:
        return {
          ...state,
          hotelOrders: action.hotelOrders
        };
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
        return {
          ...state,
          hotelOrders: [...state.hotelOrders,
            { 
                id: action.id, 
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
