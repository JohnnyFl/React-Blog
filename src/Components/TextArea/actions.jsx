import { ADD_TEXT } from "./types";

export const addText = data => {
  return {
    type: ADD_TEXT,
    payload: data
  };
};
