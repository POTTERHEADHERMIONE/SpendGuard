import React, { useState } from "react";
import useDidMount from "../../hooks/useDidMount";
import {
  calculateTracking,
  formattedSingleBudgetTracking,
} from "../../utils/calculate";
import { setTrackingClassName } from "../../utils/classNameSelectors";
import { displayDate, formatNumber } from "../../utils/format";

function BudgetDetails({
  expenditures,
  budget,
  budget: { currency, frequency, limit, startDate },
}) {
  const trackingClassName = setTrackingClassName(
    calculateTracking({ expenditures, budget })
  );
  const [showTotalTracking, setShowTotalTracking] = useState(
    "show-total-tracking"
  );

  useDidMount(() => {
    setShowTotalTracking("");
    setTimeout(() => setShowTotalTracking("show-total-tracking"), 500);
  }, [expenditures]);

  return (
    <div className="budget-details">
      <span className="goal">
        <span>Goal</span>
        <span>
          {currency}
          {formatNumber(limit)}
        </span>
        <span>per {frequency}</span>
      </span>

      <span className="total-tracking">
        <span>Total Saved</span>
        <span className={`${trackingClassName} ${showTotalTracking}`}>
          {currency}
          {formattedSingleBudgetTracking(expenditures, budget)}
        </span>
        <span>since {displayDate(startDate)}</span>
      </span>
    </div>
  );
}

export default BudgetDetails;
