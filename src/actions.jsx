import { LOAD } from "./types";
import axios from "axios";

export const loadArticles = () => dispatch => {
  axios
    .get("http://localhost:3004/articles")
    .then(res => dispatch({ type: LOAD, payload: res.data }))
    .catch(err => console.log(err));
};
