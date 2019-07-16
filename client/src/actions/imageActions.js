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

export const likeImage = id => dispatch => {
  axios({
    method: "post",
    url: `http://localhost:5000/api/images/like/${id}`
  })
    .then(res => dispatch({ type: GET_IMAGE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const unlikeImage = id => dispatch => {
  axios({
    method: "delete",
    url: `http://localhost:5000/api/images/like/${id}`
  })
    .then(res => dispatch({ type: GET_IMAGE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const deleteComment = (id, comment_id) => dispatch => {
  axios({
    method: "delete",
    url: `http://localhost:5000/api/images/comment/${id}/${comment_id}`
  })
    .then(res => dispatch({ type: GET_IMAGE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addComment = (formValues, id) => dispatch => {
  axios({
    method: "post",
    url: `http://localhost:5000/api/images/comment/${id}`,
    data: formValues
  })
    .then(res => dispatch({ type: GET_IMAGE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addImage = (formValues, history) => dispatch => {
  axios({
    method: "post",
    url: "http://localhost:5000/api/images/new",
    data: formValues
  })
    .then(res => history.push(`/profile/${res.data.profile._id}`))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
