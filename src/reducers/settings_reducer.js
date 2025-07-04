import { SET_SETTINGS } from "../constants/redux";

const settingsState = {
  "default-currency": "",
  "max-length": 250,
  categories: [],
  "quick-add": false,
};

function settingsReducer(state = settingsState, action) {
  switch (action.type) {
    case SET_SETTINGS:
      return action.settings;
    default:
      return state;
  }
}

export default settingsReducer;
