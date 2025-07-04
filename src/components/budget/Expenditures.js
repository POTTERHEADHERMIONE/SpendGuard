import React from "react";
import Period from "./Period";

function Expenditures({
  budget,
  expenditures,
  currentPeriod,
  currency,
  periods,
}) {
  const makePeriods = () => {
    const components = [];

    for (let i = 1; i <= periods; i++) {
      components.push(
        <Period
          {...{ budget, expenditures, currency }}
          period={currentPeriod - i}
          key={`${budget.name}-${i}`}
        />
      );
    }

    return components;
  };

  return (
    <div className="expenses">
      <h3>Current Period</h3>
      <Period {...{ budget, expenditures, currency }} period={currentPeriod} />

      {periods < 1 ? null : (
        <div className="old-expenses">
          <h3>Older Expenses</h3>
          {makePeriods()}
        </div>
      )}
    </div>
  );
}

export default Expenditures;
