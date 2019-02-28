import { ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from "./types";

export const addCategory = category => {
  return {
    type: ADD_CATEGORY,
    payload: category
  };
};

export const updateCategory = (category, index) => {
  return {
    type: UPDATE_CATEGORY,
    payload: category,
    index
  };
};

export const deleteCategory = index => {
  return {
    type: DELETE_CATEGORY,
    index
  };
};
