// reducer.js
import { ADD_CATEGORY, ADD_PRODUCT } from './actions';

import { categories, products } from './../data';

const initialState = {
  categories: categories,
  products: products
};

function reducer(state = initialState, action) {
  switch (action.type) {
      case ADD_CATEGORY:
        let maxId = Math.max.apply(Math, state.categories.map(x=> x.id));
        return {
          ...state,
          categories: [...state.categories,
            { id: maxId+1, name: action.name, image: action.image }
          ]
        };
      case ADD_PRODUCT:
        let maxPId = Math.max.apply(Math, state.products.map(x=> x.id));
        return {
          ...state,
          products: [...state.products,
            { id: maxPId+1, name: action.name, price: action.price, categoryId: action.categoryId, image: action.image }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
