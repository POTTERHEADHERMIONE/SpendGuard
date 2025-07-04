import {
  ADD_BUDGETS,
  SELECT_BUDGET,
  REMOVE_BUDGET,
  CHANGE_BUDGET,
  ADD_BUDGET,
  MAKE_BACKUP,
  CLEAR_BACKUP,
} from "../constants/redux";

const budgetState = {
  budgets: [],
  selected: null,
  backup: {},
};

function budgetReducer(state = budgetState, action) {
  switch (action.type) {
    case ADD_BUDGET:
      return {
        ...state,
        budgets: [...state.budgets, action.budget],
      };
    case CHANGE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.map((budget) =>
          budget.id === action.budget.id ? action.budget : budget
        ),
      };
    case REMOVE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id !== action.id),
      };
    case ADD_BUDGETS:
      return {
        ...state,
        budgets: action.budgets,
      };
    case SELECT_BUDGET:
      return {
        ...state,
        selected: action.budget,
      };
    case MAKE_BACKUP:
      return {
        ...state,
        backup: {
          budget: action.budget,
          expenditures: action.expenditures,
        },
      };
    case CLEAR_BACKUP:
      return {
        ...state,
        backup: {},
      };
    default:
      return state;
  }
}

export default budgetReducer;
