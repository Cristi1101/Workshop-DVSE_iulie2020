import * as ReactDOM from "react-dom";
import * as React from "react";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import App from "./components/app";
import "./styles.scss";
import SizeComponent from "./components/context";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/store";

const store = createStore(reducer);

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <SizeComponent>
                <App />
            </SizeComponent>
        </Router>
    </Provider>, document.getElementById("app"));