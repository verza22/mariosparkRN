import { LOGIN, LOGOUT } from './../actions/appConfig';

const initialState = {
    isAuthenticated: false,
    user: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
      case LOGIN:
        return {
            isAuthenticated: true,
            user: action.user
        };
      case LOGOUT:
        return {
            isAuthenticated: false,
            user: null
        };
    default:
      return state;
  }
}

export default reducer;
