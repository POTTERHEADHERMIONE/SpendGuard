import React from "react";
import { connect } from "react-redux";
import { clearError } from "../actions/error_actions";
import { patchBudget, clearBackup } from "../actions/budget_actions";
import { repostExpenditure } from "../actions/expenditure_actions";
import { selectBudgetExpenditures } from "../utils/selectors";
import Button from "./shared/Button";

function Error({
  errors: { error, location, debug },
  backup,
  clearError,
  setForceUpdate,
  forceUpdate,
  patchBudget,
  repostExpenditure,
  clearBackup,
  allExps,
}) {
  const reload = () => {
    clearError();
    restore();
    setForceUpdate(forceUpdate + 1);
  };

  const restore = () => {
    if (backup.budget) {
      const { budget, expenditures } = backup;
      const budgetExps = selectBudgetExpenditures(allExps, budget);
      const deleted = expenditures.filter(
        (exp) => !budgetExps.find((e) => e.id === exp.id)
      );

      patchBudget(budget.id, budget).then((_) => {
        Promise.all(deleted.map((exp) => repostExpenditure(exp))).then((_) =>
          clearBackup()
        );
      });
    }
  };

  return (
    <div>
      {error ? (
        <div className="modal-background serious-error">
          <div className="modal">
            <h2>Oops, something went wrong</h2>
            <p className="main-message">{error}</p>
            <p>
              <span className="label">Location:</span> {location}
            </p>
            <p>
              <span className="label">Debug Message:</span> {debug}
            </p>

            <Button
              callback={reload}
              className="large-submit"
              display="Reload"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  backup: state.budget.backup,
  allExps: state.expenditures,
});

export default connect(mapStateToProps, {
  clearError,
  patchBudget,
  repostExpenditure,
  clearBackup,
})(Error);
