// actions.js
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export function AddProduct(name, price, categoryId, image) {
  return {
    type: ADD_PRODUCT,
    name,
    price,
    categoryId,
    image
  };
}

export function UpdateProduct(id, name, price, categoryId, image) {
  return {
    type: UPDATE_PRODUCT,
    id,
    name,
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
