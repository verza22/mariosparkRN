// reducer.js
import { REMOVE_HOTEL_ROOM, UPDATE_HOTEL_ROOM, ADD_HOTEL_ROOM } from './../actions/hotelRoom';

import { hotelRooms, hotelRoomTypes } from './../../data';

const initialState = {
    hotelRooms: hotelRooms,
    hotelRoomTypes: hotelRoomTypes
};

function reducer(state = initialState, action) {
  switch (action.type) {
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
                type: action.typeAux
            };
          }
          return room;
        });
        return {
          ...state,
          hotelRooms: hotelRooms
        };
      case ADD_HOTEL_ROOM:
        let maxCId = Math.max.apply(Math, state.hotelRooms.map(x=> x.id));
        return {
          ...state,
          hotelRooms: [...state.hotelRooms,
            { 
                id: maxCId+1, 
                name: action.name,
                capacity: action.capacity,
                type: action.typeAux
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
