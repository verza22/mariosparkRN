import { GET_WIDGETS, ADD_WIDGET, UPDATE_WIDGET, REMOVE_WIDGET } from './../actions/widgets';

const initialState = {
  widgets: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_WIDGETS:
      return {
        ...state,
        widgets: action.widgets
      };
    case ADD_WIDGET:
      return {
        ...state,
        widgets: [...state.widgets,
          {
            id: action.id,
            userID: action.widget.userID,
            title: action.widget.title,
            symbol: action.widget.symbol,
            isLeading: action.widget.isLeading,
            infoType: action.widget.infoType,
            type: action.widget.type,
            dateFrom: action.widget.dateFrom,
            dateTo: action.widget.dateTo,
            dateFromType: action.widget.dateFromType,
            dateToType: action.widget.dateToType,
            position: action.widget.position,
            sizeX: action.widget.sizeX,
            sizeY: action.widget.sizeY,
            bgColor: action.widget.bgColor
          }
        ]
      };
    case UPDATE_WIDGET:
      let widgets = state.widgets.map(widget => {
        if (widget.id === action.widget.id) {
          return {
            ...widget,
            userID: action.widget.userID,
            title: action.widget.title,
            symbol: action.widget.symbol,
            isLeading: action.widget.isLeading,
            infoType: action.widget.infoType,
            type: action.widget.type,
            dateFrom: action.widget.dateFrom,
            dateTo: action.widget.dateTo,
            dateFromType: action.widget.dateFromType,
            dateToType: action.widget.dateToType,
            position: action.widget.position,
            sizeX: action.widget.sizeX,
            sizeY: action.widget.sizeY,
            bgColor: action.widget.bgColor
          };
        }
        return widget;
      });
      return {
        ...state,
        widgets: [...widgets]
      };
    case REMOVE_WIDGET:
      return {
        ...state,
        widgets: state.widgets.filter(widget => widget.id !== action.id)
      };
    default:
      return state;
  }
}

export default reducer;
