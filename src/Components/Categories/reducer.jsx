const initialState = {
  categories: ["Technics", "Food", "Travel"]
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return { ...state, categories: state.categories.concat(action.payload) };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          category => state.categories.indexOf(category) !== action.index
        )
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map(category =>
          state.categories.indexOf(category) === action.index
            ? action.payload
            : category
        )
      };
    default:
      return { ...state };
  }
};

export default categoryReducer;
