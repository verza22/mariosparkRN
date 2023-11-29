export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';


export function RemoveCustomer(id) {
    return {
      type: REMOVE_CUSTOMER,
      id
    };
  }
  
  export function UpdateCustomer(id, name, dni, email, phone, address) {
    return {
      type: UPDATE_CUSTOMER,
      id,
      name,
      dni,
      email,
      phone,
      address
    };
  }
  
  export function AddCustomer(name, dni, email, phone, address) {
    return {
      type: ADD_CUSTOMER,
      name,
      dni,
      email,
      phone,
      address
    };
  }