import { LOAD } from "./types";

export const loadArticles = data => {
  return {
    type: LOAD,
    payload: data
  };
};
