import { GET_IMAGE, GET_ERRORS } from "./types";
import axios from "axios";

export const getImage = id => dispatch => {
  axios({
    method: "get",
    url: `http://localhost:5000/api/images/${id}`
  })
    .then(res => dispatch({ type: GET_IMAGE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
