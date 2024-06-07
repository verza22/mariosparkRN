import { LOGIN, LOGOUT } from './../actions/appConfig';

const initialState = {
    isAuthenticated: false,
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
              name: action.user.name,
              type: action.user.userTypeId
            }
        };
      case LOGOUT:
        return {
            isAuthenticated: false,
            token: null,
            defaultStoreID: 0,
            user: null,
            hotelRoomTypes: [],
            userTypeList: [],
            userType: {},
            orderStatus: {},
            hotelOrderType: {}
        };
    default:
      return state;
  }
}

export default reducer;
