import { SET_ERROR, CLEAR_ERROR } from "../constants/redux";

const errorState = {
  error: null,
  location: null,
  debug: null,
};

function errorReducer(state = errorState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        location: action.location,
        debug: action.debug,
      };
    case CLEAR_ERROR:
      return errorState;
    default:
      return state;
  }
}

export default errorReducer;
