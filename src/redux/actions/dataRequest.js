import axios from 'axios';

import { API_URL, API_TIME_OUT, API_TIME_OUT_OFFLINE_MODE } from './../../config';
import { HandleOfflineMode } from './appConfig'

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_FAILURE = 'DATA_FAILURE';

export function DataRequest(){
    return {
        type: DATA_REQUEST
    };
};

export function DataSuccess(handleOfflineMode = true){
  return dispatch => {
    dispatch({
      type: DATA_SUCCESS
    });
    if(handleOfflineMode){
      dispatch(HandleOfflineMode(false));
    }
  }
};

export function DataFailure(error) {
    return dispatch => {
        dispatch({
            type: DATA_FAILURE,
            payload: error
        });
        setTimeout(()=>{
            dispatch(DataSuccess(false));
        },5000);
    }
};

export function axiosRequest({
  dispatch, 
  getState,
  url, 
  method = 'post',
  params = null,
  headers = null,
  showError = true
}){
    return new Promise((resolve, reject) => {
        dispatch(DataRequest());

        const state = getState();
        const token = state.appConfigReducer.token;
        const offlineMode = state.appConfigReducer.offlineMode;

        headers = headers === null ? {Authorization: `Bearer ${token}`} : headers;

        axios({
          headers: headers,
          method: method,
          url: API_URL+url,
          data: params,
          timeout: offlineMode ? API_TIME_OUT_OFFLINE_MODE : API_TIME_OUT 
        })
        .then(res => {
            resolve(res.data);
          })
        .catch(error => {
          //console.log(JSON.stringify(error))
          let errorReponse = "";
          if (error.code === 'ECONNABORTED') {
            errorReponse = 'La solicitud ha excedido el tiempo máximo permitido';
          }
          else if (error.response) {
            errorReponse = 'Error data: '+JSON.stringify(error.response.data);
          } else if (error.request) {
            errorReponse = 'Error request: '+JSON.stringify(error.request);
          } else {
            errorReponse = 'Error message: '+JSON.stringify(error.message);
          }
          if(showError && !offlineMode){
            dispatch(DataFailure(errorReponse));
          }
          if(offlineMode){
            dispatch(DataSuccess(false));
          }
          reject(error);
        });
    });
}