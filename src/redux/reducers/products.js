import { GET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT } from './../actions/products';

import { API_URL } from './../../config';

const initialState = {
  products: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      action.products.forEach(x => {
        if(!x.image.includes("http")){
          x.image = API_URL+x.image;
        }
      });
        return {
          ...state,
          products: action.products
        };
      case ADD_PRODUCT:
        return {
          ...state,
          products: [...state.products,
            { id: action.id, name: action.name, description: action.description, price: action.price, categoryId: action.categoryId, image: action.image }
          ]
        };
      case UPDATE_PRODUCT:
        let products = state.products.map(product => {
          if (product.id === action.id) {
            return {
              ...product,
              name: action.name,
              description: action.description,
              price: action.price,
              categoryId: action.categoryId,
              image: action.image
            };
          }
          return product;
        });
        return {
          ...state,
          products: products
        };
      case REMOVE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(x=> x.id !== action.id)
        };
    default:
      return state;
  }
}

export default reducer;
