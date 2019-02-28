import reducer from "../Components/Articles/reducer";
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

const store = createStore(reducer, devToolsEnhancer());

export default store;
