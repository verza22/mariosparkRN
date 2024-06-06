import axios from 'axios';

import { API_URL } from './../../config';

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_FAILURE = 'DATA_FAILURE';

export function DataRequest(){
    return {
        type: DATA_REQUEST
    };
};

export function DataSuccess(){
    return {
        type: DATA_SUCCESS
    };
};

export function DataFailure(error) {
    return dispatch => {
        dispatch({
            type: DATA_FAILURE,
            payload: error
        });
        setTimeout(()=>{
            dispatch(DataSuccess());
        },5000);
    }
};

export function axiosRequest({
  dispatch, 
  url, 
  method = 'post',
  params = null, 
  token = null
}){
    return new Promise((resolve, reject) => {
        dispatch(DataRequest());

        axios({
          headers: {Authorization: `Bearer ${token}`},
          method: method,
          url: API_URL+url,
          data: params,
          timeout: 15000 
        })
        .then(res => {
            resolve(res.data);
          })
        .catch(error => {
          console.log(JSON.stringify(error))
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
          dispatch(DataFailure(errorReponse));
        });
    });
}