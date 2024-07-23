import { GET_WIDGETS, ADD_WIDGET, UPDATE_WIDGET, REMOVE_WIDGET, GET_WIDGET_TYPE } from './../actions/widgets';

const initialState = {
  widgets: [],
  widgetTypeList: [],
  widgetInfoTypeList: [],
  sizeXList: [
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' }
  ],
  sizeYList: [
    { value: 50, label: '25px' },
    { value: 100, label: '50px' },
    { value: 150, label: '75px' },
    { value: 200, label: '100px' }
  ]
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
    case GET_WIDGET_TYPE:
      return {
        ...state,
        widgetTypeList: action.widgetTypeList.map(x=> ({value: x.KY_ID, label: x.TX_NAME})),
        widgetInfoTypeList: action.widgetInfoTypeList.map(x=> ({value: x.KY_ID, label: x.TX_NAME}))
      };
    default:
      return state;
  }
}

export default reducer;
