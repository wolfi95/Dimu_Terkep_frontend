import React from "react";
import ReactDOM from "react-dom";
import Map from "./components/Map/Map";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Admin from "./components/Admin/Admin";
import SignIn from "./components/Admin/Login";
import Edit from "./components/Admin/Edit"
import { createBrowserHistory } from "history";

export const appHistory = createBrowserHistory()

const routing = (
    <Router history = {appHistory}>
        <Switch>
            <Route exact path="/" component={Map} />
            <Route exact path="/admin" render={() => isLoggedIn() ? <Admin/> : <SignIn/>}/>
            <Route path="/admin/edit/" render={() => isLoggedIn() ? <Edit/> : <SignIn/>}/>
            <Route exact path="/login" component={SignIn} />
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
  

function isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token != null) {
        return true;
    } else {
        return false;
    }
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
