const budgetNames = [
  "Groceries",
  "Electronics",
  "Utilities",
  "Clothes",
  "Restaurants",
  "Travel",
  "Holidays",
  "Everything",
  "Gifts",
  "Plants",
];

const freqs = ["week", "month"];

function chooseRandom(choices) {
  return choices[Math.floor(choices.length * Math.random())];
}

function randomInteger(limit, minimum = 0) {
  return Math.floor(Math.random() * limit) + minimum;
}

export function randomAmount(limit, minimum = 0) {
  return (
    Math.floor(Math.random() * limit) +
    minimum +
    Math.floor(Math.random() * 100) * 0.01
  );
}

export const generateBudget = (id, startDate, currentPeriod, truncated) => ({
  name: chooseRandom(budgetNames),
  currency: "$",
  frequency: chooseRandom(freqs),
  limit: randomAmount(1000, 30),
  id,
  startDate,
  truncated,
  currentPeriod,
});

export const generateBudgets = (id, startDate, currentPeriod, truncated) => {
  const budgets = [];

  budgets.push(generateBudget(id, startDate, currentPeriod, truncated));

  for (let i = 1; i <= 5; ++i) {
    if (i === id) {
      continue;
    }

    budgets.push(generateBudget(i, Date.now(), 1, randomAmount(200, 50)));
  }

  return budgets;
};

export const generateExpense = (id, budgetId, period) => ({
  title: chooseRandom(budgetNames),
  amount: randomAmount(200, 0.5),
  date: Date.now(),
  id,
  budgetId,
  period,
});

export const generateExpenses = (budgetId, periodLimit) => {
  const expenses = [];

  for (let i = 1; i <= 10; ++i) {
    expenses.push(generateExpense(i, budgetId, randomInteger(periodLimit, 1)));
  }

  return expenses;
};

export const generateBudgetsAndExpenses = (
  budgetId,
  startDate,
  currentPeriod,
  truncated
) => {
  const budgets = generateBudgets(
    budgetId,
    startDate,
    currentPeriod,
    truncated
  );
  const expenses = budgets.reduce((accum, budget) => {
    accum[budget.id] = generateExpenses(budget.id, currentPeriod);
    return accum;
  }, {});

  return {
    budgets,
    expenses,
  };
};
