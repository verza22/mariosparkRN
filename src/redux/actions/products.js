import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';
import { GET_CATEGORIES } from './category'

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export function GetProducts(token, storeID, categoryID, needCategories) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'product/getProducts',
      token,
      params: {
        storeID,
        categoryID: categoryID === null ? 0 : categoryID,
        needCategories
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res.products.length > 0){
        dispatch({
          type: GET_PRODUCTS,
          products: res.products
        });
      }
      if(needCategories && res.categories.length > 0){
        dispatch({
          type: GET_CATEGORIES,
          categories: res.categories
        });
      }
    })
  }
}

export function AddProduct(token, storeID, name, description, price, categoryId, image, callback) {
  return dispatch => {

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: 'image.jpg'
    });
    formData.append('productID', 0);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    formData.append('storeID', storeID);
    formData.append('changeImage', true);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'product/AddOrUpdateProduct',
      headers,
      params: formData
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: ADD_PRODUCT,
          name,
          description,
          price,
          categoryId,
          image
        });
        callback();
      }
    })
  }
}

export function UpdateProduct(token, storeID, id, name, description, price, categoryId, image, callback) {
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
    formData.append('productID', id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    formData.append('storeID', storeID);
    formData.append('changeImage', changeImage);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'product/AddOrUpdateProduct',
      headers,
      params: formData
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: UPDATE_PRODUCT,
          id,
          name,
          description,
          price,
          categoryId,
          image: typeof image.uri !== "undefined" ? image.uri : image
        });
        callback();
      }
    })
  }
}

export function RemoveProduct(token, id, callback) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'product/RemoveProduct',
      token,
      params: {
        productID: id
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res){
        dispatch({
          type: REMOVE_PRODUCT,
          id
        });
        callback();
      }
    })
  }
}