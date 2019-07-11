import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = formValues => dispatch => {
  axios({
    method: "post",
    url: "http://localhost:5000/api/profiles/register",
    data: formValues,
    mode: "no-cors"
  })
    .then(res => console.log(res.data))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

export const loginUser = formValues => dispatch => {
  axios({
    method: "post",
    url: "http://localhost:5000/api/profiles/login",
    data: formValues,
    mode: "no-cors"
  })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwt_token", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(error => {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
