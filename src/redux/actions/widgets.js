import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_WIDGETS = 'GET_WIDGETS';
export const ADD_WIDGET = 'ADD_WIDGET';
export const UPDATE_WIDGET = 'UPDATE_WIDGET';
export const REMOVE_WIDGET = 'REMOVE_WIDGET';

export function GetWidgets(userId) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'widget/getWidgets',
      params: {
        userId
      }
    })
    .then(res => {
      dispatch(DataSuccess());
      if (res.length > 0) {
        dispatch({
          type: GET_WIDGETS,
          widgets: res
        });
      }
    })
    .catch(error => {
      dispatch(DataFailure(error));
    });
  }
}

export function AddWidget(widget, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch,
      getState,
      method: 'post',
      url: 'widget/AddOrUpdateWidget',
      params: {
        widgetId: 0,
        userId: widget.userID,
        title: widget.title,
        symbol: widget.symbol,
        isLeading: widget.isLeading,
        infoType: widget.infoType,
        type: widget.type,
        dateFrom: widget.dateFrom,
        dateTo: widget.dateTo,
        dateFromType: widget.dateFromType,
        dateToType: widget.dateToType,
        position: widget.position,
        sizeX: widget.sizeX,
        sizeY: widget.sizeY,
        bgColor: widget.bgColor
      }
    })
    .then(res => {
      dispatch(DataSuccess());
      if (res > 0) {
        dispatch({
          type: ADD_WIDGET,
          widget: {
            id: res,
            ...widget
          }
        });
        callback();
      }
    })
    .catch(error => {
      dispatch(DataFailure(error));
    });
  }
}

export function UpdateWidget(widget, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch,
      getState,
      method: 'post',
      url: 'widget/AddOrUpdateWidget',
      params: {
        widgetId: widget.id,
        userId: widget.userID,
        title: widget.title,
        symbol: widget.symbol,
        isLeading: widget.isLeading,
        infoType: widget.infoType,
        type: widget.type,
        dateFrom: widget.dateFrom,
        dateTo: widget.dateTo,
        dateFromType: widget.dateFromType,
        dateToType: widget.dateToType,
        position: widget.position,
        sizeX: widget.sizeX,
        sizeY: widget.sizeY,
        bgColor: widget.bgColor
      }
    })
    .then(res => {
      dispatch(DataSuccess());
      if (res > 0) {
        dispatch({
          type: UPDATE_WIDGET,
          widget
        });
        callback();
      }
    })
    .catch(error => {
      dispatch(DataFailure(error));
    });
  }
}

export function RemoveWidget(id, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'widget/RemoveWidget',
      params: {
        widgetId: id
      }
    })
    .then(res => {
      dispatch(DataSuccess());
      if (res > 0) {
        dispatch({
          type: REMOVE_WIDGET,
          id
        });
        callback();
      }
    })
    .catch(error => {
      dispatch(DataFailure(error));
    });
  }
}

export function UpdateWidgetPositions(userID, widgetIDs, callback) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'widget/UpdateWidgetPositions',
      params: {
        userID,
        widgetIDs: widgetIDs.join(',')
      }
    })
    .then(res => {
      dispatch(DataSuccess());
      if (res === "ok") {
        callback();
      }
    })
    .catch(error => {
      dispatch(DataFailure(error));
    });
  }
}
