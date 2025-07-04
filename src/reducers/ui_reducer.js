import { CHANGE_VIEW } from "../constants/redux";

const uiState = "DASHBOARD";

function uiReducer(state = uiState, action) {
  switch (action.type) {
    case CHANGE_VIEW:
      return action.view;
    default:
      return state;
  }
}

export default uiReducer;
