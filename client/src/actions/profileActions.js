import axios from "axios";
import { GET_ERRORS, GET_PROFILE } from "./types";

export const editProfile = formValues => dispatch => {};

export const deleteProfile = () => dispatch => {};

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
