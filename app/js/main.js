import React from "react"
import Parse from "parse"

let PARSE_APP_ID = "m6cPbArnJyhg0yoMeAwU5bpClSXWjZnuTOcaChuq";
let PARSE_JS_KEY = "3z3mull3Uyyqs6bJLfNTt0uU4sZ5H1VEkjD75NBp";
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);

/* ROUTES */

import App from "./components/App"
import Login from "./components/Login"
import Todos from "./components/routes/Todos"
import Profile from "./components/routes/Profile"

import Router, {Route, RouteHandler, DefaultRoute} from "react-router"

// Style
require("./../assets/styles/about.less")
require("./../assets/styles/feed.less")
require("./../assets/styles/login.less")
require("./../assets/styles/main.less")
require("./../assets/styles/profile.less")
require("./../assets/styles/toast.less")

// Temporarily set / route as profile to work on profile
// Restore to {Todos} later and figure out route
// Should have <Route name="todos" handler={Todos} path="/">
let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Todos} />
    <Route name="login" handler={Login} />
    <Route name="todos" handler={Profile} path="/">
      <Route name="todo-new" path="/todos/new" handler={Todos} />
      <Route name="todo" path="/todo/:todoId" handler={Todos} />
    </Route>
    <Route name="profile" handler={Profile} path="/profile" />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
