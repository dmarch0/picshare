import { SET_CURRENT_USER } from "../actions/types";

const initialState = { isAuthenticated: false, user: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { isAuthenticated: true, user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
