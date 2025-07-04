import React from "react";
import {
  formattedTotalTracking,
  calculateTotalTracking,
} from "../../utils/calculate";
import { setTrackingClassName } from "../../utils/classNameSelectors";

function Total({ budgets = [], expenditures, currency }) {
  const trackingClassName = setTrackingClassName(
    calculateTotalTracking(budgets, expenditures)
  );

  return (
    <div className="budget-total">
      <span className="label">Total</span>
      <span className={`amount ${trackingClassName}`}>
        {currency}
        {formattedTotalTracking(budgets, expenditures)}
      </span>
    </div>
  );
}

export default Total;
