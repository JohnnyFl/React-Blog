import {
  DELETE_ARTICLE,
  ADD_PREVIEW_TEXT,
  ADD_POST_TEXT,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  LOAD_ARTICLES,
  SEARCH_FIELD
} from "../Constants/articlesConstants";
import axios from "axios";

const articlesAPI = "http://localhost:3004/articles/";

export const loadArticles = () => dispatch => {
  axios
    .get(articlesAPI)
    .then(res => dispatch({ type: LOAD_ARTICLES, payload: res.data }))
    .catch(err => console.log(err));
};

export const deleteArticle = id => dispatch => {
  axios
    .delete(`${articlesAPI}${id}`)
    .then(() => dispatch({ type: DELETE_ARTICLE, payload: id }))
    .catch(err => console.log(err));
};

export const addPreviewText = data => {
  return {
    type: ADD_PREVIEW_TEXT,
    payload: data
  };
};

export const addPostText = data => {
  return {
    type: ADD_POST_TEXT,
    payload: data
  };
};

export const addSearchText = searchText => {
  return {
    type: SEARCH_FIELD,
    payload: searchText
  };
};

export const addArticle = (
  image,
  title,
  previewText,
  postText,
  author,
  postDate,
  category
) => dispatch => {
  axios
    .post(articlesAPI, {
      image,
      title,
      previewText,
      postText,
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
  previewText,
  postText,
  author,
  postDate,
  category,
  id
) => dispatch => {
  console.log('image:',image,'title:',
    title,"2",
    previewText,"3",
    postText,"4",
    author,"5",
    postDate,"6",
    category,"7",
    id);
  axios
    .put(`${articlesAPI}${id}`, {
      image,
      title,
      previewText,
      postText,
      author,
      postDate,
      category
    })
    .then(res =>
      dispatch({
        type: UPDATE_ARTICLE,
        id: res.data.id,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
