import { SET_TOOLTIP, CLEAR_TOOLTIP } from "../constants/redux";

const tooltipState = [];
let id = 1;

function tooltipReducer(state = tooltipState, action) {
  switch (action.type) {
    case SET_TOOLTIP:
      return [...state, { tooltip: action.tooltip, id: ++id }];
    case CLEAR_TOOLTIP:
      return state.filter((tt) => tt.id !== action.id);
    default:
      return state;
  }
}

export default tooltipReducer;
