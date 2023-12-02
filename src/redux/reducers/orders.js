import { ADD_ORDER } from './../actions/orders';

import { orders } from './../../data';

const initialState = {
    orders: orders
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
        let maxId = Math.max.apply(Math, state.orders.map(x=> x.id));
        return {
          ...state,
          orders: [...state.orders,
            { 
              id: maxId+1, 
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
