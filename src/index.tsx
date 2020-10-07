import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./firebase/config";
import { Provider } from "react-redux";
import { createStore } from "redux";
import store from "./store";

console.log("ici l'apelle du store", store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.querySelector("#root")
);
