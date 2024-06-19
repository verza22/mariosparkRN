import { LOGIN, LOGIN_WITHOUT_ETHERNET, LOGOUT, OFFLINE_MODE } from './../actions/appConfig';

const initialState = {
    isAuthenticated: false,
    offlineMode: false,
    token: null,
    defaultStoreID: 0,
    user: null,
    hotelRoomTypes: [],
    userTypeList: [],
    userType: {},
    orderStatus: {},
    hotelOrderType: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
      case LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          token: action.token,
          defaultStoreID: action.user.defaultStoreID,
          hotelRoomTypes: action.hotelRoomTypes,
          userTypeList: action.userTypeList,
          userType: action.userType,
          orderStatus: action.orderStatus,
          hotelOrderType: action.hotelOrderType,
          user: {
            id: action.user.id,
            username: action.user.username,
            password: action.password,
            name: action.user.name,
            type: action.user.type
          }
        };
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false
        };
      case LOGIN_WITHOUT_ETHERNET:
        let isAuthenticated = state.user !== null ? (state.user.username === action.userName && state.user.password === action.password) : false;
        return {
          ...state,
          isAuthenticated: isAuthenticated,
          offlineMode: isAuthenticated
        };
      case OFFLINE_MODE:
        return {
          ...state,
          offlineMode: action.mode
        };
    default:
      return state;
  }
}

export default reducer;
