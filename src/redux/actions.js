// actions.js
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export function AddCategory(name, image) {
  return {
    type: ADD_CATEGORY,
    name: name,
    image: image
  };
}

export function AddProduct(name, price, categoryId, image) {
  return {
    type: ADD_PRODUCT,
    name,
    price,
    categoryId,
    image
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