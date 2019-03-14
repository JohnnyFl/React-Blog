import {
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  ADD_PREVIEW_TEXT,
  ADD_POST_TEXT,
  LOAD_ARTICLES,
  SEARCH_FIELD
} from "../Constants/articlesConstants";

const initialState = {
  articles: [],
  previewText: "",
  postText: "",
  searchField: ""
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, articles: action.payload };
    case ADD_ARTICLE:
      return { ...state, articles: state.articles.concat(action.payload) };
    case UPDATE_ARTICLE:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.id ? action.payload : article
        )
      };
    case ADD_PREVIEW_TEXT:
      return { ...state, previewText: action.payload };
    case ADD_POST_TEXT:
      return { ...state, postText: action.payload };
    case SEARCH_FIELD: {
      return { ...state, searchField: action.payload };
    }
    case DELETE_ARTICLE:
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
