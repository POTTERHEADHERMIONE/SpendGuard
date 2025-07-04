import React, { useState, useEffect, useRef } from "react";
import "../../styles/budgets-menu.css";
import { budgetsByCurrency } from "../../utils/format";
import Budget from "./Budget";
import Total from "./Total";
import { sortByStartDateAsc } from "../../utils/format";

function Budgets({ budgets = [], expenditures = [] }) {
  const [budgetGroups, setBudgetGroups] = useState({});
  const budgetCount = useRef(0);
  const firstLoad = useRef(true);

  useEffect(() => {
    setTimeout(() => (firstLoad.current = false), 5000);
  }, []);

  useEffect(() => {
    setBudgetGroups(budgetsByCurrency(budgets));
  }, [budgets]);

  useEffect(() => {
    if (budgets.length && budgetCount.current === budgets.length) {
      firstLoad.current = false;
    }
  });

  const noBudgets = () =>
    budgets.length === 0 ? (
      <div className="no-items">
        <p>You don't have any budgets.</p>
        <p>Wanna make one? Look up!</p>
      </div>
    ) : null;

  return (
    <section className="budgets-menu">
      {noBudgets()}
      {Object.keys(budgetGroups).map((key) => (
        <ul key={key}>
          {sortByStartDateAsc(budgetGroups[key]).map((budget) => {
            budgetCount.current++;

            return <Budget {...{ budget, firstLoad }} key={budget.id} />;
          })}
          <Total
            budgets={budgetGroups[key]}
            expenditures={expenditures}
            currency={key}
          />
        </ul>
      ))}
    </section>
  );
}

export default Budgets;
