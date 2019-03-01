import { DELETE_ARTICLE, GET_ID, GET_TEXT } from "./types";
import axios from "axios";

export const deleteArticle = id => dispatch => {
  axios
    .delete(`http://localhost:3004/articles/${id}`)
    .then(() => dispatch({ type: DELETE_ARTICLE, payload: id }))
    .catch(err => console.log(err));
};

export const getId = id => {
  return {
    type: GET_ID,
    payload: id
  };
};

export const getText = text => {
  return {
    type: GET_TEXT,
    payload: text
  };
};
