import { SET_CURRENT_USER } from "../actions/types";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { isAuthentificated: true, user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
