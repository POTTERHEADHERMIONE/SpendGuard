import { formatNumber } from "./format";
import { makeDate } from "./format";
import { periodOptions, msPerDay } from "../constants/general";

function sum(array, selector) {
  return array.reduce((sum, el) => sum + el[selector], 0);
}

function sumExpenditures(expenditures) {
  return sum(expenditures, "amount");
}

export function totalSpent(expenditures, budgetId) {
  return expenditures[budgetId] ? sumExpenditures(expenditures[budgetId]) : 0;
}

// Overall tracking for a single budget
export function calculateTracking({
  expenditures,
  budget: { id, limit, currentPeriod, truncated },
}) {
  const spent = totalSpent(expenditures, id);

  return currentPeriod > 0 ? limit * currentPeriod - truncated - spent : 0;
}

export function formattedSingleBudgetTracking(expenditures, budget) {
  return formatNumber(calculateTracking({ expenditures, budget }));
}

// Overall tracking for many budgets
export function calculateTotalTracking(budgets, expenditures) {
  return budgets.reduce(
    (sum, budget) => sum + calculateTracking({ expenditures, budget }),
    0
  );
}

export function formattedTotalTracking(budgets, expenditures) {
  return formatNumber(calculateTotalTracking(budgets, expenditures));
}

function getCurrentExpenditures(budgetId, currentPeriod, expenditures) {
  const budgetExpenditures = expenditures[budgetId] || [];
  return budgetExpenditures.filter((exp) => exp.period === currentPeriod);
}

export function calculatePeriodSpent({
  expenditures,
  budget: { id, currentPeriod },
  period = null,
}) {
  const selectedPeriod = period || currentPeriod;
  const currentExpenditures = getCurrentExpenditures(
    id,
    selectedPeriod,
    expenditures
  );

  return sumExpenditures(currentExpenditures);
}

export function formattedPeriodSpent(expenditures, budget, period) {
  return formatNumber(
    calculatePeriodSpent({
      expenditures,
      budget,
      period,
    })
  );
}

// Tracking for a single budget during the current period
// get all expenditures for current period, sum them
// subtract sum from limit
export function calculateRemainingSpend({
  expenditures,
  budget: { id, limit, currentPeriod },
  period = null,
}) {
  const selectedPeriod = period || currentPeriod;
  const currentExpenditures = getCurrentExpenditures(
    id,
    selectedPeriod,
    expenditures
  );

  return currentExpenditures.length === 0
    ? limit
    : limit - sumExpenditures(currentExpenditures);
}

export function formattedRemainingSpend(expenditures, budget, period) {
  return formatNumber(
    calculateRemainingSpend({
      expenditures,
      budget,
      period,
    })
  );
}

// to calculate current period from start date, subtract dates
// add a day to make count inclusive, and then divide by ms in a day
// to get correct period, round up to nearest int
export function calculatePeriod(expDate, { startDate, frequency }) {
  const spendDate = new Date(expDate);
  const startingDate = new Date(startDate);
  const daysDiff = (spendDate - startingDate + msPerDay) / msPerDay;
  const ratio =
    frequency === periodOptions.week.value
      ? daysDiff / periodOptions.week.days
      : daysDiff / periodOptions.month.days;

  return Math.ceil(ratio);
}

export function calculatePeriodFromToday(budget) {
  return calculatePeriod(makeDate(), budget);
}
