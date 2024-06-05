import { LOGIN, LOGOUT } from './../actions/appConfig';

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
      case LOGIN:
        return {
            isAuthenticated: true,
            token: action.user.token,
            user: {
              id: action.user.userId,
              username: action.user.username,
              name: action.user.name,
              ownerId: action.user.ownerId,
              type: action.user.userTypeId
            }
        };
      case LOGOUT:
        return {
            isAuthenticated: false,
            token: null,
            user: null
        };
    default:
      return state;
  }
}

export default reducer;
