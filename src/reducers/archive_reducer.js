import {
  ADD_ARCHIVED,
  ARCHIVE_BUDGET,
  DELETE_ARCHIVED,
} from "../constants/redux";

const archiveState = [];

function archiveReducer(state = archiveState, action) {
  switch (action.type) {
    case ADD_ARCHIVED:
      return action.budgets;
    case ARCHIVE_BUDGET:
      return [...state, action.budget];
    case DELETE_ARCHIVED:
      return state.filter((budget) => budget.id !== action.budget.id);
    default:
      return state;
  }
}

export default archiveReducer;
