import { createBrowserHistory } from "history"
import * as React from "react"
import * as ReactDom from 'react-dom'
import "./styles.scss"
import { Button, Text, Icon } from "./components/_shared"
import Header from "./components/header/component"
import { Router, Route, Switch } from "react-router"
import Home from "./components/home/component"
import Basket from "./components/basket/component"
import { createStore } from "redux"
import { reducer } from "./business/reducer"
import { Provider } from "react-redux"
import Login from "./components/auth/login"
// import Button from "./components/_shared/button/component"
// import Text from "./components/_shared/text/component"

const history = createBrowserHistory()

const store = createStore(reducer)

function startApp() {
    return (
        <Provider store={store} >
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/basket">
                        <Basket />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    )
}

ReactDom.render(
    startApp(), document.getElementById("app"))