import { GET_IMAGE, IMG_LOADING } from "../actions/types";

const initialState = {};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMG_LOADING:
      return { image: {}, loading: true };
    case GET_IMAGE:
      return { image: action.payload, loading: false };
    default:
      return state;
  }
};

export default imageReducer;
