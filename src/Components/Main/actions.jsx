import { ADD_ARTICLE, UPDATE_ARTICLE } from "./types";
import axios from "axios";

export const addArticle = (
  image,
  title,
  body,
  author,
  postDate,
  category
) => dispatch => {
  axios
    .post("http://localhost:3004/articles", {
      image,
      title,
      body,
      author,
      postDate,
      category
    })
    .then(res => dispatch({ type: ADD_ARTICLE, payload: res.data }))
    .catch(err => console.log(err));
};

export const updateArticle = (
  image,
  title,
  body,
  author,
  postDate,
  category,
  id
) => dispatch => {
  axios
    .put(`http://localhost:3004/articles/${id}`, {
      image,
      title,
      body,
      author,
      postDate,
      category
    })
    .then(res =>
      dispatch({ type: UPDATE_ARTICLE, id: res.data.id, payload: res.data })
    )
    .catch(err => console.log(err));
};
