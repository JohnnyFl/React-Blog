import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import reducer from '../Reducers/rootReducer'
import ReduxThunk from "redux-thunk";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
