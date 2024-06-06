import { GET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT } from './../actions/products';

import { products } from './../../data';

const initialState = {
  products: products
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
        return {
          ...state,
          products: action.products.map(x=>({
            id: x.productId, 
            name: x.name, 
            description: x.description, 
            price: x.price, 
            categoryId: x.categoryId, 
            image: x.image,
            storeId: x.storeId
          }))
        };
      case ADD_PRODUCT:
        let maxPId = Math.max.apply(Math, state.products.map(x=> x.id));
        return {
          ...state,
          products: [...state.products,
            { id: maxPId+1, name: action.name, description: action.description, price: action.price, categoryId: action.categoryId, image: action.image }
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
