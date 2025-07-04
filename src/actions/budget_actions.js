import {
  getBudgets,
  deleteBudget,
  updateBudget,
  createBudget,
  updateBudgetCurrentPeriod,
} from "../utils/comms";
import { chainPromise } from "./error_actions";
import {
  ADD_BUDGETS,
  SELECT_BUDGET,
  REMOVE_BUDGET,
  CHANGE_BUDGET,
  ADD_BUDGET,
  MAKE_BACKUP,
  CLEAR_BACKUP,
} from "../constants/redux";
import { removeBudgetExpenditures } from "./expenditure_actions";

export const addBudgets = (budgets) => ({
  type: ADD_BUDGETS,
  budgets,
});

// currently unused
export function fetchBudgets() {
  return (dispatch) => {
    getBudgets().then((budgets) => {
      dispatch(addBudgets(budgets));
    });
  };
}

export const selectBudget = (budget) => ({
  type: SELECT_BUDGET,
  budget,
});

export const removeBudget = (id) => ({
  type: REMOVE_BUDGET,
  id,
});

export function destroyBudget(id) {
  const errorObj = {
    error: "Budget might not have deleted. You may need to try again.",
    location: "destroyBudget()",
  };

  return (dispatch) => {
    return chainPromise(
      dispatch,
      () => deleteBudget(id),
      [
        () => dispatch(removeBudget(id)),
        () => dispatch(removeBudgetExpenditures(id)),
      ],
      errorObj
    );
  };
}

export const changeBudget = (budget) => ({
  type: CHANGE_BUDGET,
  budget,
});

export function patchBudget(id, budget) {
  const errorObj = {
    error: "Budget might not have updated. You may need to try again.",
    location: "patchBudget()",
  };

  return (dispatch) => {
    return chainPromise(
      dispatch,
      () => updateBudget(id, budget),
      [(budget) => dispatch(changeBudget(budget))],
      errorObj
    );
  };
}

export const addBudget = (budget) => ({
  type: ADD_BUDGET,
  budget,
});

export function newBudget(budget) {
  const errorObj = {
    error: "Budget might not have been created. You may need to try again.",
    location: "newBudget()",
  };

  return (dispatch) => {
    return chainPromise(
      dispatch,
      () => createBudget(budget),
      [(budget) => dispatch(addBudget(budget))],
      errorObj
    );
  };
}

function getBudgetsChained(callback, dispatch, location) {
  const errorObj = {
    error: "Could not fetch all budgets.",
    location,
  };

  return chainPromise(
    dispatch,
    getBudgets,
    [(budgets) => callback(budgets)],
    errorObj
  );
}

function updateAllBudgets(budgets, dispatch) {
  const errorObj = {
    error: "Could not update all budget periods.",
    location: "Promise.all([updateBudgetCurrentPeriod])",
  };

  const getBudgets = () => {
    getBudgetsChained(
      (budgets) => dispatch(addBudgets(budgets)),
      dispatch,
      "updateBudgetsCurrentPeriods() > getBudgets()"
    );
  };

  return chainPromise(
    dispatch,
    () =>
      Promise.all(budgets.map((budget) => updateBudgetCurrentPeriod(budget))),
    [getBudgets],
    errorObj
  );
}

export function updateBudgetsCurrentPeriods() {
  return (dispatch) => {
    return getBudgetsChained(
      (budgets) => updateAllBudgets(budgets, dispatch),
      dispatch,
      "getBudgets()"
    );
  };
}

export const makeBackup = (budget, expenditures) => ({
  type: MAKE_BACKUP,
  budget,
  expenditures,
});

export const clearBackup = () => ({
  type: CLEAR_BACKUP,
});
