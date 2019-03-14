import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import articleReducer from "../Reducers/articlesReducer";

export default combineReducers({
  categories: categoryReducer,
  articles: articleReducer
});
