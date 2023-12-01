export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_USER = 'ADD_USER';


export function RemoveUser(id) {
    return {
      type: REMOVE_USER,
      id
    };
  }
  
  export function UpdateUser(id, user, name, password, userType) {
    return {
      type: UPDATE_USER,
      id,
      user,
      name,
      password,
      userType
    };
  }
  
  export function AddUser(user, name, password, userType) {
    return {
      type: ADD_USER,
      user,
      name,
      password,
      userType
    };
  }