import { combineReducers } from "redux";
import { auth } from "./auth";
import { botReducer } from "./bot";

import { orderReducer } from "./order";

import { productReducer } from "./product";

const reducers = combineReducers({
  auth,
  botReducer,
  orderReducer,
  productReducer
});

export default reducers;
