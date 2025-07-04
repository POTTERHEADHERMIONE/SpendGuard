import React from "react";
import Form from "../shared/Form";
import NumberInput from "../shared/NumberInput";
import SubmitButton from "../shared/SubmitButton";
import ClickOrHold from "../shared/ClickOrHold";
import HiddenLabel from "../shared/HiddenLabel";

function SimpleExpenditureForm({
  currency,
  amount,
  setAmount,
  onSubmit,
  showModal,
  quickAdd,
}) {
  const clickCallback = quickAdd ? onSubmit : showModal;
  const holdCallback = quickAdd ? showModal : onSubmit;

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      clickCallback();
    }
  };

  return (
    <div className="absolute">
      <div className="fixed-bottom" onKeyPress={handleEnterKey}>
        <Form className="simple-expenditure-form">
          <span className="currency">{currency}</span>

          <HiddenLabel id="expense-amount" text="Expense Amount" />
          <NumberInput
            value={amount}
            allowNeg={true}
            callback={setAmount}
            id="expense-amount"
          />

          <ClickOrHold
            clickCallback={clickCallback}
            holdCallback={holdCallback}
          >
            <SubmitButton value="+" />
          </ClickOrHold>
        </Form>
      </div>
    </div>
  );
}

export default SimpleExpenditureForm;
