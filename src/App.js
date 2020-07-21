import React from "react";
import "./assets/style/App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";
import Login from "./Login";
import Home from "./Home";
import GoogleRedirect from "./GoogleRedirect";

function App() {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/googleLogin" component={GoogleRedirect} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
