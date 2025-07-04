export function selectExpenditures(expenditures, period) {
  return expenditures.filter((item) => item.period === period);
}

export function selectDeletions(expenditures, budget) {
  const oldestPeriod = earliestPeriod(expenditures);

  return expenditures.reduce(
    (res, exp) => {
      if (exp.period === oldestPeriod) {
        res.exps.push(exp);
        res.truncate += exp.amount;
      }

      return res;
    },
    { exps: [], truncate: budget.truncated }
  );
}

export function selectBudgetExpenditures(expenditures, budget) {
  return expenditures[budget.id];
}

export function earliestPeriod(expenditures) {
  return expenditures.reduce(
    (earliest, exp) => (earliest < exp.period ? earliest : exp.period),
    expenditures[0].period
  );
}
