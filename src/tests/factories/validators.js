export const totalSpent = (budgetsExpenses, budgetId) =>
  budgetsExpenses.expenses[budgetId].reduce(
    (total, exp) => total + exp.amount,
    0
  );

export const budgetTracking = (budgetsExpenses, budgetId) => {
  const { budgets } = budgetsExpenses;
  const budget = budgets.find((b) => b.id === budgetId);

  return (
    budget.currentPeriod * budget.limit -
    totalSpent(budgetsExpenses, budget.id) -
    budget.truncated
  );
};

export const allBudgetsTracking = (budgetsExpenses) => {
  const { budgets } = budgetsExpenses;
  const totalAllowed = budgets.reduce(
    (total, budget) =>
      budget.limit * budget.currentPeriod + total - budget.truncated,
    0
  );
  const allSpent = budgets.reduce(
    (total, budget) => totalSpent(budgetsExpenses, budget.id) + total,
    0
  );

  return totalAllowed - allSpent;
};
