import { GET_IMAGE } from "../actions/types";

const initialState = {};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGE:
      return action.payload;
    default:
      return state;
  }
};

export default imageReducer;
