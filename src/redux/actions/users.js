export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_USER = 'ADD_USER';


export function RemoveUser(id) {
    return {
      type: REMOVE_USER,
      id
    };
  }
  
  export function UpdateUser(id, name, password, type) {
    return {
      type: UPDATE_USER,
      id,
      name,
      password,
      type
    };
  }
  
  export function AddUser(name, password, type) {
    return {
      type: ADD_USER,
      name,
      password,
      type
    };
  }