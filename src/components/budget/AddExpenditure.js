import React, { useState } from "react";
import { connect } from "react-redux";
import {
  postExpenditure,
  truncateExpenditures,
} from "../../actions/expenditure_actions";
import { validateAmount } from "../../utils/formMethods";
import { earliestPeriod } from "../../utils/selectors";
import { delay, scrollToEl } from "../../utils/uiBehavior";
import ExpenditureForm from "./ExpenditureForm";
import SimpleExpenditureForm from "./SimpleExpenditureForm";

function AddExpenditure({
  budget,
  budget: { currency, currentPeriod, startDate },
  postExpenditure,
  truncateExpenditures,
  expenditures,
  maxLength,
  setIsTruncating,
  quickAdd,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [showExpenditureForm, setShowExpenditureForm] = useState(false);

  // Only truncate periods earlier than current period when over limit
  const handleTruncation = () => {
    if (
      expenditures.length >= maxLength &&
      earliestPeriod(expenditures) !== currentPeriod
    ) {
      setIsTruncating(true);
      truncateExpenditures(expenditures, budget).then((_) =>
        setTimeout(() => setIsTruncating(false), 2500)
      );
    }
  };

  const reset = () => {
    setTitle("");
    setAmount("");
    setExpenseDate("");
    setShowExpenditureForm(false);
  };

  const loadUntilFound = (id) => {
    const loadMoreBtn = document.getElementById("load-more");

    while (!document.getElementById(id)) {
      loadMoreBtn.click();
    }
  };

  const onSubmit = (e) => {
    if (validateAmount(amount)) {
      postExpenditure(
        {
          title: title.trim(),
          amount: parseFloat(amount),
          date: expenseDate,
        },
        budget
      ).then((exp) => {
        handleTruncation();

        if (exp) {
          delay(() => {
            const id = `exp-${exp.expenditure.id}`;

            loadUntilFound(id);
            scrollToEl(id);
          });
        }
      });

      reset();
    }
  };

  const showModal = () => {
    setShowExpenditureForm(true);
  };

  return (
    <>
      <SimpleExpenditureForm
        {...{ currency, amount, setAmount, quickAdd, onSubmit, showModal }}
      />

      {showExpenditureForm ? (
        <ExpenditureForm
          close={reset}
          showError={!validateAmount(amount)}
          {...{
            onSubmit,
            title,
            currency,
            amount,
            setAmount,
            setTitle,
            expenseDate,
            setExpenseDate,
            startDate,
          }}
        />
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => ({
  budget: state.budget.selected,
  maxLength: state.settings["max-length"],
  quickAdd: state.settings["quick-add"],
});

export default connect(mapStateToProps, {
  postExpenditure,
  truncateExpenditures,
})(AddExpenditure);
