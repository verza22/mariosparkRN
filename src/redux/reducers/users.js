// reducer.js
import { REMOVE_USER, UPDATE_USER, ADD_USER } from './../actions/users';

import { users, userType } from './../../data';

const initialState = {
    users: users,
    userType: userType
};

function reducer(state = initialState, action) {
  switch (action.type) {
      case REMOVE_USER:
        return {
          ...state,
          users: state.users.filter(x=> x.id !== action.id)
        };
      case UPDATE_USER:
        let users = state.users.map(user => {
          if (user.id === action.id) {
            return {
                ...user,
                name: action.name,
                password: action.password,
                type: action.type
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
        return {
          ...state,
          users: [...state.users,
            { 
                id: maxId+1, 
                name: action.name,
                password: action.password,
                type: action.type
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
