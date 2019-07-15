import axios from "axios";
import { GET_ERRORS, GET_PROFILE, SET_CURRENT_USER } from "./types";

export const editProfile = (formValues, history, id) => dispatch => {
  axios({
    method: "post",
    url: "http://localhost:5000/api/profiles/edit",
    data: formValues,
    mode: "no-cors"
  })
    .then(res => history.push(`/profile/${id}`))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

export const deleteProfile = history => dispatch => {
  axios({
    method: "delete",
    url: "http://localhost:5000/api/profiles/"
  })
    .then(res => history.push("/"))
    .catch(err => console.log(err));
};

export const getProfile = id => dispatch => {
  axios({
    method: "get",
    url: `http://localhost:5000/api/profiles/${id}`,
    mode: "no-cors"
  })
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

export const followProfile = id => dispatch => {
  axios({
    url: `http://localhost:5000/api/profiles/follow/${id}`,
    method: "post"
  })
    .then(profile => {
      dispatch({ type: SET_CURRENT_USER, payload: profile.data });
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

export const unfollowProfile = id => dispatch => {
  axios({
    method: "delete",
    url: `http://localhost:5000/api/profiles/follow/${id}`
  })
    .then(profile => {
      dispatch({ type: SET_CURRENT_USER, payload: profile.data });
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};
