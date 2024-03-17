import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateSlice from "./reducers/stateSlice";
import requestSlice from "./reducers/requestSlice";

const reducer = combineReducers({
  stateSlice,
  requestSlice,
});
export const store = configureStore({
  reducer,
});
