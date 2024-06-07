import { GET_CUSTOMERS, REMOVE_CUSTOMER, UPDATE_CUSTOMER, ADD_CUSTOMER } from './../actions/customer';

import { customers } from './../../data';

const initialState = {
  customers: customers
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMERS:
        return {
          ...state,
          customers: action.customers
        };
      case REMOVE_CUSTOMER:
        return {
          ...state,
          customers: state.customers.filter(x=> x.id !== action.id)
        };
      case UPDATE_CUSTOMER:
        let customers = state.customers.map(customer => {
          if (customer.id === action.id) {
            return {
              ...customer,
              name: action.name,
              dni: action.dni,
              email: action.email,
              phone: action.phone,
              address: action.address
            };
          }
          return customer;
        });
        return {
          ...state,
          customers: customers
        };
      case ADD_CUSTOMER:
        let maxCId = Math.max.apply(Math, state.customers.map(x=> x.id));
        return {
          ...state,
          customers: [...state.customers,
            { 
              id: maxCId+1, 
              name: action.name,
              dni: action.dni,
              email: action.email,
              phone: action.phone,
              address: action.address 
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
