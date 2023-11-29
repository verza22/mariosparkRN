// actions.js
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

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