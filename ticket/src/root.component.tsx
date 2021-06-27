import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "@babel/polyfill";
import { Provider } from "react-redux";
import store from "./store";
import List from "./pages/List";
import Ticket from "./pages/Detail";

const App = (props) => {
  return (
    <Switch>
      <Route path="/ticket/:id">
        <Ticket {...props} />
      </Route>
      <Route path="/">
        <List {...props} />
      </Route>
    </Switch>
  );
};

export default (props) => (
  <BrowserRouter>
    <Provider store={store}>
      <App {...props} />
    </Provider>
  </BrowserRouter>
);
