import { GET_PRINTERS, REMOVE_PRINTER, UPDATE_PRINTER, ADD_PRINTER } from './../actions/printers';

const initialState = {
    printers: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRINTERS:
        return {
          ...state,
          printers: action.printers
        };
      case REMOVE_PRINTER:
        return {
          ...state,
          printers: state.printers.filter(x=> x.id !== action.id)
        };
      case UPDATE_PRINTER:
        let printers = state.printers.map(printer => {
          if (printer.id === printer.id) {
            return {
                ...printer,
                name: action.name,
                ip: action.ip,
                isPrincipal: action.isPrincipal
            };
          }
          return printer;
        });
        return {
          ...state,
          printers: printers
        };
      case ADD_PRINTER:
        return {
          ...state,
          printers: [...state.printers,
            { 
                id: action.id,
                name: action.name,
                ip: action.ip,
                isPrincipal: action.isPrincipal,
                storeID: action.storeID
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
