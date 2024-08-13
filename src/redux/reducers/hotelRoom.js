import { GET_HOTEL_ROOMS, REMOVE_HOTEL_ROOM, UPDATE_HOTEL_ROOM, ADD_HOTEL_ROOM } from './../actions/hotelRoom';


const initialState = {
    hotelRooms: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_ROOMS:
        return {
          ...state,
          hotelRooms: action.hotelRooms
        };
      case REMOVE_HOTEL_ROOM:
        return {
          ...state,
          hotelRooms: state.hotelRooms.filter(x=> x.id !== action.id)
        };
      case UPDATE_HOTEL_ROOM:
        let hotelRooms = state.hotelRooms.map(room => {
          if (room.id === action.id) {
            return {
                ...room,
                name: action.name,
                capacity: action.capacity,
                type: action.typeAux,
                priceBabies: action.priceBabies,
                priceChildren: action.priceChildren,
                priceAdults: action.priceAdults
            };
          }
          return room;
        });
        return {
          ...state,
          hotelRooms: hotelRooms
        };
      case ADD_HOTEL_ROOM:
        return {
          ...state,
          hotelRooms: [...state.hotelRooms,
            { 
                id: action.id, 
                name: action.name,
                capacity: action.capacity,
                type: action.typeAux,
                priceBabies: action.priceBabies,
                priceChildren: action.priceChildren,
                priceAdults: action.priceAdults
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
