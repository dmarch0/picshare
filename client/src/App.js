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
import EditProfile from "./components/profile-display/EditProfile";
import ImageDisplay from "./components/image-display/ImageDisplay";
import AddImageForm from "./components/profile-display/AddImageForm";
import Feed from "./components/feed/Feed";

const initialState = {
  feed: { pageCounter: 0, images: [], lastPage: false, loading: false }
};
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
  //Check if token exists, then set axios default
  setAuthToken(localStorage.jwt_token);

  //set curren user
  const decoded = jwt_decode(localStorage.jwt_token);
  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/:profile_id" component={ProfileDisplay} />
          <Route exact path="/image/:image_id" component={ImageDisplay} />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route exact path="/add-image" component={AddImageForm} />
          <Route exact path="/feed" component={Feed} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
