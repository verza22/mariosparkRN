import { GET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY } from './../actions/category';

const initialState = {
  categories: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
        return {
          ...state,
          categories: action.categories
        };
      case ADD_CATEGORY:
        let maxId = Math.max.apply(Math, state.categories.map(x=> x.id));
        return {
          ...state,
          categories: [...state.categories,
            { id: maxId+1, name: action.name, image: action.image }
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
      case REMOVE_CATEGORY:
        return {
          ...state,
          categories: state.categories.filter(x=> x.id !== action.id)
        };
    default:
      return state;
  }
}

export default reducer;
