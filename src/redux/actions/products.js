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

export function AddProduct(name, description, price, categoryId, image) {
  return {
    type: ADD_PRODUCT,
    name,
    description,
    price,
    categoryId,
    image
  };
}

export function UpdateProduct(id, name, description, price, categoryId, image) {
  return {
    type: UPDATE_PRODUCT,
    id,
    name,
    description,
    price,
    categoryId,
    image
  };
}

export function RemoveProduct(id) {
  return {
    type: REMOVE_PRODUCT,
    id
  };
}
