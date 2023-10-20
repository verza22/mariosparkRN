// actions.js
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_PRODUCT = 'ADD_PRODUCT';

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