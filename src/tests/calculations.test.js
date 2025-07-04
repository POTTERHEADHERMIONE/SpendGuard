import * as calc from "../utils/calculate";
import * as factory from "./factories/budgets_expenses";
import { roundedDecimal } from "./factories/normalizers";
import * as staticData from "./factories/static_data";

const budgetsExpenses = staticData.budgetsExpenses;
const { budgets, expenses } = budgetsExpenses;
const trackingPerBudget = staticData.trackingPerBudget;

describe("calculations", () => {
  describe("totalSpent", () => {
    it("can handle an empty list of expenditures", () => {
      expect(calc.totalSpent({}, 4)).toBe(0);
    });

    it("sums the correct amount for a chosen budget", () => {
      budgets.forEach((budget) => {
        expect(roundedDecimal(calc.totalSpent(expenses, budget.id))).toBe(
          roundedDecimal(staticData.totalSpentPerBudget[budget.id])
        );
      });
    });
  });

  describe("calculateTracking", () => {
    it("returns the amount left to spend based on the current period, truncated value, and amount spent", () => {
      budgets.forEach((budget) => {
        const testTotal = calc.calculateTracking({
          expenditures: expenses,
          budget,
        });

        expect(roundedDecimal(trackingPerBudget[budget.id])).toBe(
          roundedDecimal(testTotal)
        );
      });
    });

    it("returns 0 for a budget that hasn't started", () => {
      const budget = factory.generateBudget(1, Date.now(), 0, 0);
      const expenditures = { 1: [] };
      const total = 0;

      expect(calc.calculateTracking({ expenditures, budget })).toBe(total);
    });
  });

  describe("calculateTotalTracking", () => {
    it("returns the total amount left to spend across all budgets", () => {
      const testTotal = calc.calculateTotalTracking(budgets, expenses);

      expect(roundedDecimal(testTotal)).toBe(
        roundedDecimal(staticData.totalTrackingAllBudgets)
      );
    });

    it("returns 0 when there are no budgets", () => {
      expect(calc.calculateTotalTracking([], {})).toBe(0);
    });
  });

  describe("calculatePeriodSpent", () => {
    const budget = budgets[0];

    it("returns the total amount spent during a given period for a budget", () => {
      for (let period = 1; period <= budget.currentPeriod; ++period) {
        const testTotal = calc.calculatePeriodSpent({
          expenditures: expenses,
          budget,
          period,
        });
        const total = staticData.spendingPerPeriodBudgetOne[period];

        expect(roundedDecimal(testTotal)).toBe(roundedDecimal(total));
      }
    });

    it("returns 0 when there are no expenses", () => {
      expect(
        calc.calculatePeriodSpent({ expenditures: {}, budget, period: 1 })
      ).toBe(0);
    });
  });

  describe("calculateRemainingSpend", () => {
    const budget = budgets[0];

    it("returns the amount left to spend for a period based on the limit and expenses for that period", () => {
      for (let period = 1; period <= budget.currentPeriod; ++period) {
        const testTotal = calc.calculateRemainingSpend({
          expenditures: expenses,
          budget,
          period,
        });
        const total = staticData.leftToSpendPerPeriodBudgetOne[period];

        expect(roundedDecimal(testTotal)).toBe(roundedDecimal(total));
      }
    });
  });

  describe("calculatePeriod", () => {
    it("returns the correct period given an expense date, start date, and weekly frequency", () => {
      const frequency = "week";
      const weekExpenseDates = [
        "2020/07/09",
        "2020/07/15",
        "2020/07/16",
        "2020/11/23",
      ];
      const weekResults = [1, 1, 2, 20];

      weekExpenseDates.forEach((date, idx) => {
        expect(
          calc.calculatePeriod(date, {
            startDate: "2020/07/09",
            frequency,
          })
        ).toBe(weekResults[idx]);
      });
    });

    it("returns the correct period given an expense date, start date, and monthly frequency", () => {
      const frequency = "month";
      const monthExpenseDates = [
        "2020/07/09",
        "2020/08/07",
        "2020/08/08",
        "2021/01/05",
      ];
      const monthResults = [1, 1, 2, 7];

      monthExpenseDates.forEach((date, idx) => {
        expect(
          calc.calculatePeriod(date, {
            startDate: "2020/07/09",
            frequency,
          })
        ).toBe(monthResults[idx]);
      });
    });
  });
});
