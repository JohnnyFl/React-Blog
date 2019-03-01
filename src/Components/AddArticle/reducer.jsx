const initialState = {
  body: "",
  id: "",
  text: ""
};

const addEditArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TEXT":
      return { ...state, body: action.payload };
    case "GET_ID":
      return { ...state, id: action.payload };
    case "GET_TEXT":
      return { ...state, text: action.payload };
    default:
      return { ...state };
  }
};

export default addEditArticleReducer;
