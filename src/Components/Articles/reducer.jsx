const initialState = {
  articles: []
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return { ...state, articles: action.payload };
    case "ADD_ARTICLE":
      return { ...state, articles: state.articles.concat(action.payload) };
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

export default articleReducer;
