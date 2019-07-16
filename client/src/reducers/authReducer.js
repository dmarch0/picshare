import { SET_CURRENT_USER, LOGOUT } from "../actions/types";

const initialState = { isAuthenticated: false, user: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { isAuthenticated: true, user: action.payload };
    case LOGOUT:
      return { isAuthenticated: false, user: {} };
    default:
      return state;
  }
};

export default authReducer;
