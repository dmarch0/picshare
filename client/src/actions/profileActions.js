import axios from "axios";
import { GET_ERRORS, GET_PROFILE } from "./types";

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
