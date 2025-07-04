import React, { useState } from "react";
import { patchExpenditure } from "../../actions/expenditure_actions";
import { connect } from "react-redux";
import ExpenditureForm from "./ExpenditureForm";
import { calculatePeriod } from "../../utils/calculate";
import { setTooltip } from "../../actions/tooltip_actions";

function EditItem({
  item: { id, title, amount, date },
  currency,
  setShowEdit,
  patchExpenditure,
  budget,
  budget: { startDate },
  setTooltip,
}) {
  const [newTitle, setTitle] = useState(title);
  const [newAmount, setAmount] = useState(amount);
  const [expenseDate, setExpenseDate] = useState(date);

  const close = () => {
    setShowEdit(false);
  };

  const onSubmit = (e) => {
    if (newAmount !== "") {
      const expDate = expenseDate || date;

      patchExpenditure(id, {
        title: newTitle.trim(),
        amount: parseFloat(newAmount),
        date: expDate,
        period: calculatePeriod(expDate, budget),
      }).then(({ expenditure }) =>
        setTooltip(`${expenditure.title} was updated.`)
      );

      close();
    }
  };

  return (
    <>
      <ExpenditureForm
        {...{
          onSubmit,
          setTitle,
          currency,
          setAmount,
          expenseDate,
          setExpenseDate,
          startDate,
          close,
        }}
        title={newTitle}
        amount={newAmount}
        showError={newAmount === ""}
        edit={true}
      />
    </>
  );
}

export default connect(null, { patchExpenditure, setTooltip })(EditItem);
