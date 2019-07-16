import axios from "axios";
import {
  SET_CURRENT_USER,
  GET_ERRORS,
  GET_FEED,
  NEXT_PAGE,
  PREV_PAGE,
  LAST_PAGE,
  LOADING
} from "./types";

export const getFeed = page => async dispatch => {
  try {
    dispatch({ type: LOADING });
    const res = await axios({
      method: "get",
      url: "http://localhost:5000/api/images/feed/getfeed",
      params: {
        page: page
      }
    });

    console.log(res.data);
    if (res.data.images.length === 0) {
      return dispatch({
        type: GET_ERRORS,
        payload: { imagesnotfound: "Images not found" }
      });
    }
    if (res.data.images.length < 10) {
      dispatch({ type: LAST_PAGE });
    }
    dispatch({ type: GET_FEED, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const nextPage = currentPage => (dispatch, getState) => {
  dispatch({ type: NEXT_PAGE });
  dispatch(getFeed(currentPage + 1));
};

export const prevPage = currentPage => dispatch => {
  dispatch({ type: PREV_PAGE });
  dispatch(getFeed(currentPage - 1));
};
