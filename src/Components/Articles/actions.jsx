import { DELETE_ARTICLE, GET_ID, GET_TEXT } from "./types";

export const deleteArticle = id => {
  return {
    type: DELETE_ARTICLE,
    payload: id
  };
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
