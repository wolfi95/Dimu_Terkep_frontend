import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Admin from "./Admin";
import SignIn from "./Login";
import Edit from "./Edit"
import { createBrowserHistory } from "history";

export const appHistory = createBrowserHistory()

const routing = (
    <Router history = {appHistory}>
        <Switch>
            <Route exact path="/" component={Map} />
            <Route exact path="/admin" component={Admin} />
            <Route path="/admin/edit/" component={Edit} />
            <Route exact path="/login" component={SignIn} />
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// const loggedIn = () => {
//     // ...
//   }
  

// function requireAuth(nextState, replace) {
//     if (!loggedIn()) {
//       replace({
//         pathname: '/login'
//       })
//     }
//   }


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
