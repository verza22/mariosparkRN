import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export function GetCategories(token, storeID) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'get',
      url: 'category/'+storeID,
      token
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res.length > 0){
        dispatch({
          type: GET_CATEGORIES,
          categories: res
        });
      }
    })
  }
}

export function AddCategory(name, image) {
  return {
    type: ADD_CATEGORY,
    name: name,
    image: image
  };
}

export function UpdateCategory(id, name, image) {
  return {
    type: UPDATE_CATEGORY,
    id,
    name,
    image
  };
}

export function RemoveCategory(id) {
  return {
    type: REMOVE_CATEGORY,
    id
  };
}