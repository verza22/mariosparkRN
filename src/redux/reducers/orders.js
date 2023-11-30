// import { REMOVE_CUSTOMER, UPDATE_CUSTOMER, ADD_CUSTOMER } from './../actions/customer';

import { orders } from './../../data';

const initialState = {
    orders: orders
};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
