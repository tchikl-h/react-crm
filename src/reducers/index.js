import { combineReducers } from "redux";
import { auth } from "./auth";
import { botReducer } from "./bot";

import { intentReducer } from "./intent";

import { productReducer } from "./product";

const reducers = combineReducers({
  auth,
  botReducer,
  intentReducer,
  productReducer
});

export default reducers;
