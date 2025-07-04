import React, { useState, useEffect } from "react";
import { patchBudget } from "../../actions/budget_actions";
import { connect } from "react-redux";
import DateComp from "../shared/DateComp";
import { calculatePeriodFromToday } from "../../utils/calculate";
import Form from "../shared/Form";
import SubmitButton from "../shared/SubmitButton";
import CancelButton from "../shared/CancelButton";
import TextInput from "../shared/TextInput";
import Error from "../shared/Error";
import Explainer from "../shared/Explainer";
import { setTooltip } from "../../actions/tooltip_actions";

function UpdateBudget({ budget, close, patchBudget, setTooltip }) {
  const [name, setName] = useState(budget.name);
  const [startDate, setStartDate] = useState(budget.startDate);
  const [shouldDisableDate, setShouldDisableDate] = useState(false);

  const handleSubmit = (e) => {
    if (name.length > 0) {
      const budgetOptions = { name: name.trim() };

      if (startDate) {
        const currentPeriod = calculatePeriodFromToday({
          startDate,
          frequency: budget.frequency,
        });

        budgetOptions.startDate = startDate;
        budgetOptions.currentPeriod = currentPeriod;
      }

      patchBudget(budget.id, budgetOptions).then(({ budget }) =>
        setTooltip(`${budget.name} has been updated.`)
      );

      close();
    }
  };

  useEffect(() => {
    setShouldDisableDate(Date.now() >= new Date(startDate));
    // eslint-disable-next-line
  }, []);

  return (
    <Form callback={handleSubmit} className="budget-settings">
      <div>
        <label htmlFor="budget-name">Budget Name</label>
        <TextInput
          placeholder={budget.name}
          callback={setName}
          value={name}
          className="name-input"
          autoFocus={true}
          id="budget-name"
        />
      </div>

      <div>
        <label htmlFor="start-date">Start Date (optional)</label>
        <DateComp
          setStartDate={setStartDate}
          disabled={shouldDisableDate}
          date={startDate}
          id="start-date"
        />
      </div>
      <Explainer text="Start date cannot be changed once a budget has started." />

      <Error msg="Budget name is required" condition={!name} />

      <div className="buttons">
        <SubmitButton value="Update" />
        <CancelButton callback={close} />
      </div>
    </Form>
  );
}

export default connect(null, { patchBudget, setTooltip })(UpdateBudget);
