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

export function AddCategory(token, storeID, name, image, callback) {
  return dispatch => {

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: 'image.jpg'
    });
    formData.append('categoryID', 0);
    formData.append('name', name);
    formData.append('storeID', storeID);
    formData.append('changeImage', true);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'category/AddOrUpdateCategory',
      headers,
      params: formData
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: ADD_CATEGORY,
          name: name,
          image: image
        });
        callback();
      }
    })
  }
}

export function UpdateCategory(token, storeID, id, name, image, callback) {
  return dispatch => {

    let changeImage = typeof image !== "string";

    const formData = new FormData();
    if(changeImage){
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: 'image.jpg'
      });
    }
    formData.append('categoryID', id);
    formData.append('name', name);
    formData.append('storeID', storeID);
    formData.append('changeImage', changeImage);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'category/AddOrUpdateCategory',
      headers,
      params: formData
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: UPDATE_CATEGORY,
          id,
          name: name,
          image: typeof image.uri !== "undefined" ? image.uri : image
        });
        callback();
      }
    })
  }
}

export function RemoveCategory(token, id, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'category/RemoveCategory',
      token,
      params: {
        categoryID: id
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: REMOVE_CATEGORY,
          id
        });
        callback();
      }
    })
  }
}