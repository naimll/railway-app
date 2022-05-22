import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

import * as actionTypes from "../actions/actionType";
import auth from "./auth";

const appReducer = combineReducers({
  auth,
});

const rootReducer = (state, action) => {
  //   if (action.type === actionTypes.LOGOUT) {
  //     // for all keys defined in your persistConfig(s)
  //     storage.removeItem("persist:root");
  //     state = undefined;
  //   }
  return appReducer(state, action);
};
const persistConfig = {
  key: "root",
  storage,
  //blacklist: ["auth"],
};
const reducers = persistReducer(persistConfig, rootReducer);

export default reducers;
