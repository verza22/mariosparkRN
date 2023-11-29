// reducer.js
import { ADD_CATEGORY, ADD_PRODUCT, UPDATE_CATEGORY, UPDATE_PRODUCT, REMOVE_CATEGORY, REMOVE_PRODUCT, REMOVE_CUSTOMER, UPDATE_CUSTOMER, ADD_CUSTOMER } from './actions';

import { categories, products, customers } from './../data';

const initialState = {
  categories: categories,
  products: products,
  customers: customers
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
      case UPDATE_CATEGORY:
        let categories = state.categories.map(category => {
          if (category.id === action.id) {
            return {
              ...category,
              name: action.name,
              image: action.image,
            };
          }
          return category;
        });
        return {
          ...state,
          categories: categories
        };
      case UPDATE_PRODUCT:
        let products = state.products.map(product => {
          if (product.id === action.id) {
            return {
              ...product,
              name: action.name,
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
      case REMOVE_CATEGORY:
        return {
          ...state,
          categories: state.categories.filter(x=> x.id !== action.id)
        };
      case REMOVE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(x=> x.id !== action.id)
        };
      case REMOVE_CUSTOMER:
        return {
          ...state,
          customers: state.customers.filter(x=> x.id !== action.id)
        };
      case UPDATE_CUSTOMER:
        let customers = state.customers.map(customer => {
          if (customer.id === action.id) {
            return {
              ...customer,
              name: action.name,
              dni: action.dni,
              email: action.email,
              phone: action.phone,
              address: action.address
            };
          }
          return customer;
        });
        return {
          ...state,
          customers: customers
        };
      case ADD_CUSTOMER:
        let maxCId = Math.max.apply(Math, state.customers.map(x=> x.id));
        return {
          ...state,
          customers: [...state.customers,
            { 
              id: maxCId+1, 
              name: action.name,
              dni: action.dni,
              email: action.email,
              phone: action.phone,
              address: action.address 
            }
          ]
        };
    default:
      return state;
  }
}

export default reducer;
