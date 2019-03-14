import * as actions from "../Constants/categoryConstants";

const initialState = {
  categories: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_CATEGORIES:
      return { ...state, categories: action.payload };
    case actions.ADD_CATEGORY:
      return { ...state, categories: state.categories.concat(action.payload) };
    case actions.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.id !== action.id
        )
      };
    case actions.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.id ? action.payload : category
        )
      };
    default:
      return { ...state };
  }
};

export default categoryReducer;
