const initialState = {
  articles: [],
  body: "",
  id: "",
  text: "",
  categories: ["Technics", "Food", "Travel"]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return { ...state, articles: action.payload };
    case "ADD_TEXT":
      return { ...state, body: action.payload };
    case "ADD_ARTICLE":
      return { ...state, articles: state.articles.concat(action.payload) };
    case "GET_ID":
      return { ...state, id: action.payload };
    case "GET_TEXT":
      return { ...state, text: action.payload };
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
    case "UPDATE_ARTICLE":
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.id ? action.payload : article
        )
      };
    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id !== action.payload
        )
      };

    default:
      return { ...state };
  }
};

export default reducer;
