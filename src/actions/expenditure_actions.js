import { formatExpenditures } from "../utils/format";
import {
  getExpenditures,
  deleteExpenditure,
  updateExpenditure,
  createExpenditure,
  updateBudget,
  makeExpenditure,
} from "../utils/comms";
import {
  changeBudget,
  selectBudget,
  makeBackup,
  clearBackup,
} from "./budget_actions";
import { selectDeletions } from "../utils/selectors";
import { chainPromise, dispatchError } from "./error_actions";
import {
  ADD_EXPENDITURES,
  REMOVE_EXPENDITURE,
  REMOVE_BUDGET_EXPENDITURES,
  UPDATE_EXPENDITURE,
  ADD_EXPENDITURE,
} from "../constants/redux";

export const addExpenditures = (expenditures) => ({
  type: ADD_EXPENDITURES,
  expenditures,
});

export function fetchExpenditures() {
  const errorObj = {
    error: "Could not fetch all expenditures.",
    location: "fetchExpenditures()",
  };

  return (dispatch) => {
    return chainPromise(
      dispatch,
      getExpenditures,
      [(exps) => dispatch(addExpenditures(formatExpenditures(exps)))],
      errorObj
    );
  };
}

export const removeExpenditure = (expenditure) => ({
  type: REMOVE_EXPENDITURE,
  expenditure,
});

export function destroyExpenditure(expenditure) {
  const errorObj = {
    error: "Could not delete expenditure.",
    location: "destroyExpenditure()",
  };

  return (dispatch) => {
    return chainPromise(
      dispatch,
      () => deleteExpenditure(expenditure.id),
      [() => dispatch(removeExpenditure(expenditure))],
      errorObj
    );
  };
}

export const removeBudgetExpenditures = (budgetId) => ({
  type: REMOVE_BUDGET_EXPENDITURES,
  budgetId,
});

export const editExpenditure = (expenditure) => ({
  type: UPDATE_EXPENDITURE,
  expenditure,
});

export function patchExpenditure(id, updated) {
  const errorObj = {
    error: "Could not edit expenditure.",
    location: "patchExpenditure()",
  };

  return (dispatch) => {
    return chainPromise(
      dispatch,
      () => updateExpenditure(id, updated),
      [(exp) => dispatch(editExpenditure(exp))],
      errorObj
    );
  };
}

export const addExpenditure = (expenditure) => ({
  type: ADD_EXPENDITURE,
  expenditure,
});

export function postExpenditure(expenditure, budget) {
  const errorObj = {
    error: "Could not create expenditure.",
    location: "postExpenditure()",
  };

  return (dispatch) => {
    return chainPromise(
      dispatch,
      () => createExpenditure(expenditure, budget),
      [(exp) => dispatch(addExpenditure(exp))],
      errorObj
    );
  };
}

export function repostExpenditure(expenditure) {
  const errorObj = {
    error: "Could not recreate expenditure.",
    location: "repostExpenditure()",
  };

  return (dispatch) => {
    return chainPromise(
      dispatch,
      () => makeExpenditure(expenditure),
      [(exp) => dispatch(addExpenditure(exp))],
      errorObj
    );
  };
}

// IDEAL WAY WOULD BE TO COPY THE FILE, MUTATE COPY, REPLACE ORIGINAL
// ONLY ON SUCCESSFUL TRUNCATION OF COPY
// ALL OTHER METHODS LEAVE ROOM FOR ERROR
// OR USE DB WITH ROLLBACK FEATURE AND TRANSACTIONS
export function truncateExpenditures(expenditures, budget) {
  const budgetId = budget.id;
  const deletions = selectDeletions(expenditures, budget);

  return (dispatch) => {
    dispatch(makeBackup(budget, deletions.exps));

    return Promise.all(
      deletions.exps.map((exp) => {
        return deleteExpenditure(exp.id).then((_) => {
          dispatch(removeExpenditure(exp));
        });
      })
    )
      .then((_) => {
        updateBudget(budgetId, { truncated: deletions.truncate })
          .then((budget) => {
            dispatch(changeBudget(budget));
            dispatch(selectBudget(budget));
            dispatch(clearBackup());
          })
          .catch((err) => {
            // if budget truncate update doesn't happen, will land here
            dispatchError(dispatch, {
              debug: err,
              error: "Failed to update or fetch budget after truncation.",
              location: "truncateExpenditures() > updateBudget()",
            });
          });
      })
      .catch((err) => {
        // if any expenditure (throws) doesn't delete, should land here
        dispatchError(dispatch, {
          debug: err,
          error: "Failed to truncate expenditures.",
          location: "truncateExpenditures() > deleteExpenditure()",
        });
      });
  };
}
