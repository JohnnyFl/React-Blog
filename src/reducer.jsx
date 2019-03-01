import { combineReducers } from "redux";
import categoryReducer from "./Components/Categories/reducer";
import articleReducer from "./Components/Articles/reducer";
import addEditArticleReducer from "./Components/AddArticle/reducer";

export default combineReducers({
  categoryReducer,
  articleReducer,
  addEditArticleReducer
});
