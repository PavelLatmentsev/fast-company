import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { Router } from "react-router-dom";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import history from "./utils/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();
root.render(
    <Provider store={store}>
        <Router history={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </Provider>
);
