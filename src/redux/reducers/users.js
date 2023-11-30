// reducer.js
import { REMOVE_USER, UPDATE_USER, ADD_USER } from './../actions/users';

import { users } from './../../data';

import CryptoJS from "rn-crypto-js";


const initialState = {
    users: users
};

function reducer(state = initialState, action) {
  switch (action.type) {
      case REMOVE_USER:
        return {
          ...state,
          users: state.users.filter(x=> x.id !== action.id)
        };
      case UPDATE_USER:
        let password = action.password;
        if(password !== ""){
          password = CryptoJS.SHA1(password).toString();
        }
        let users = state.users.map(user => {
          if (user.id === action.id) {
            return {
                ...user,
                name: action.name,
                password: password !== "" ? password : user.password,
                type: action.userType
            };
          }
          return user;
        });
        return {
          ...state,
          users: users
        };
      case ADD_USER:
        let maxId = Math.max.apply(Math, state.users.map(x=> x.id));
        let password2 = action.password;
        if(password2 !== ""){
          password2 = CryptoJS.SHA1(password2).toString();
        }
        return {
          ...state,
          users: [...state.users,
            { 
                id: maxId+1, 
                name: action.name,
                password: password2,
                type: action.userType
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
