import { combineReducers } from "redux";
import { reducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  test: () => 5,
  form: reducer,
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer
});
