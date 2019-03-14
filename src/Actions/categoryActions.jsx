import {
  LOAD_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from "../Constants/categoryConstants";
import axios from "axios";

const categories_API = "http://localhost:3004/categories/";

export const loadCategories = () => dispatch => {
  axios
    .get(categories_API)
    .then(res => dispatch({ type: LOAD_CATEGORIES, payload: res.data }))
    .catch(err => console.log(err));
}

export const addCategory = name => dispatch => {
  axios
    .post(categories_API, {
      name
    })
    .then(res => dispatch({ type: ADD_CATEGORY, payload: res.data }))
    .catch(err => console.log(err));
};

export const updateCategory = (name, id) => dispatch => {
  axios
    .put(`${categories_API}${id}`, { name, id })
    .then(res => dispatch({ type: UPDATE_CATEGORY, payload: res.data, id }))
    .catch(err => console.log(err));
};

export const deleteCategory = id => dispatch => {
  axios
    .delete(`${categories_API}${id}`)
    .then(() => dispatch({ type: DELETE_CATEGORY, id }))
    .catch(err => console.log(err));
};
