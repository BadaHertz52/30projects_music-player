import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { legacy_createStore as createStore } from "redux";
import "../src/assets/styles/reset.scss";
import "../src/assets/styles/index.scss";
import { Provider } from "react-redux";
import musicPlayerReducer from "./store/musicPlayerReducer";

const store = createStore(musicPlayerReducer);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
