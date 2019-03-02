import reducer from '../reducer'
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
