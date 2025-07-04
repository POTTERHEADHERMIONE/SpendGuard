import React from "react";
import Item from "./Item";
import {
  selectExpenditures,
  selectBudgetExpenditures,
} from "../../utils/selectors";
import {
  formattedPeriodSpent,
  formattedRemainingSpend,
  calculateRemainingSpend,
} from "../../utils/calculate";
import { sortByDateDesc } from "../../utils/format";
import { setTrackingClassName } from "../../utils/classNameSelectors";

function Period({ title, expenditures, currency, budget, period }) {
  const budgetExpenditures = () => {
    const expendituresFromBudget = selectBudgetExpenditures(
      expenditures,
      budget
    );

    return expendituresFromBudget
      ? sortByDateDesc(selectExpenditures(expendituresFromBudget, period))
      : [];
  };

  const displayExpenditures = () =>
    budgetExpenditures().length > 0 ? (
      <ul className="period-expense">
        {budgetExpenditures().map((item) => (
          <Item {...{ item, currency, budget }} key={`exp-${item.id}`} />
        ))}
      </ul>
    ) : (
      <p className="no-expenses">No expenses for this period</p>
    );

  const setTitle = () => (title ? <h3>{title}</h3> : null);

  const trackingClassName = setTrackingClassName(
    calculateRemainingSpend({
      expenditures,
      budget,
      period,
    })
  );

  return (
    <div className="period">
      {setTitle()}
      {displayExpenditures()}
      <ul className="period-details">
        <li>
          Left to Spend:{" "}
          <span className={trackingClassName}>
            {currency}
            {formattedRemainingSpend(expenditures, budget, period)}
          </span>
        </li>
        <li>
          Total Spent:{" "}
          <span className={trackingClassName}>
            {currency}
            {formattedPeriodSpent(expenditures, budget, period)}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Period;
