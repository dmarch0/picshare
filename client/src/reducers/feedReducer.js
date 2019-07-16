import {
  GET_FEED,
  NEXT_PAGE,
  PREV_PAGE,
  LAST_PAGE,
  LOADING
} from "../actions/types";

const initialState = {
  pageCounter: 0,
  images: [],
  lastPage: false,
  loading: false
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED:
      return {
        ...state,
        images: action.payload,
        loading: false
      };
    case NEXT_PAGE:
      if (!state.lastPage && !state.loading) {
        return {
          ...state,
          pageCounter: state.pageCounter + 1
        };
      } else {
        return { ...state };
      }

    case PREV_PAGE:
      if (state.pageCounter === 0) {
        return { ...state };
      } else {
        return {
          ...state,
          pageCounter: state.pageCounter - 1
        };
      }
    case LAST_PAGE:
      return { ...state, lastPage: true };
    case LOADING: {
      return { ...state, loading: true };
    }
    default:
      return state;
  }
};

export default feedReducer;
