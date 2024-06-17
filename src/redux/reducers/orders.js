import { GET_ORDERS, ADD_ORDER } from './../actions/orders';

const initialState = {
    orders: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
        return {
          ...state,
          orders: action.orders
        };
    case ADD_ORDER:
        return {
          ...state,
          orders: [...state.orders,
            { 
              id: action.id, 
              cashierID: action.cashierID,
              waiterID: action.waiterID,
              chefID: action.chefID,
              total: action.total,
              date: action.date,
              tableNumber: action.tableNumber,
              paymentMethod: action.paymentMethod,
              orderStatus: action.orderStatus,
              customer: action.customer,
              products: action.products
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
