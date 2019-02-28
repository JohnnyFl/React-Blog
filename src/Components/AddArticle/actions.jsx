import { ADD_ARTICLE, UPDATE_ARTICLE } from "./types";

export const addArticle = data => {
  return {
    type: ADD_ARTICLE,
    payload: data
  };
};

export const updateArticle = article => {
  return {
    type: UPDATE_ARTICLE,
    id: article.id,
    payload: article
  };
};
