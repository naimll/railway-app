import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { applyMiddleware, compose } from "redux";
import reducers from "./store/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
// const store = configureStore({
//   reducers,
//   middleware: applyMiddleware(thunk),
//   devTools: process.env.NODE_ENV !== "production",

//   enhancers: composeEnhancers(applyMiddleware(thunk)),
// });

export const persistor = persistStore(store);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
