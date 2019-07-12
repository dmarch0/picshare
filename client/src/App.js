import React from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import ProtectedRoute from "./components/common/ProtectedRoute";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./actions/authActions";
import ProfileDisplay from "./components/profile-display/ProfileDisplay";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.jwt_token) {
  console.log("Im here");
  setAuthToken(localStorage.jwt_token);

  const decoded = jwt_decode(localStorage.jwt_token);

  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/:profile_id" component={ProfileDisplay} />
        <Switch>
          <ProtectedRoute exact path="/feed" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
