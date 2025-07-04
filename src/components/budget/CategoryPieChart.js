import React from "react";
import { selectBudgetExpenditures } from "../../utils/selectors";
import { maxPieCategories } from "../../constants/general";
import { VictoryPie, VictoryLabel } from "victory";
import { formatNumber } from "../../utils/format";

function CategoryPieChart({ budget, expenditures }) {
  const budgetExps = selectBudgetExpenditures(expenditures, budget) || [];
  const groupByTitle = budgetExps.reduce((accum, exp) => {
    const title = exp.title === "" ? "Untitled" : exp.title;

    if (!accum[title]) {
      accum[title] = 0;
    }

    accum[title] += exp.amount;

    return accum;
  }, {});

  const data = Object.keys(groupByTitle).reduce((accum, title) => {
    accum.push({ x: title, y: groupByTitle[title] });

    return accum;
  }, []);

  if (data.length > maxPieCategories) {
    data.sort((a, b) => b.y - a.y);

    const other = data
      .splice(maxPieCategories)
      .reduce((total, d) => d.y + total, 0);

    data.push({ x: "Other", y: other });
  }

  const labelPlacement = data.length > 1 ? "parallel" : "vertical";

  const truncateLabel = (label) =>
    label.length < 13 ? label : `${label.slice(0, 12)}…`;

  return (
    <div className="pie-chart">
      {budgetExps.length > 0 ? (
        <VictoryPie
          colorScale={["#FA7E61", "#FFD046", "#31AFD4", "#003F91", "#D8FDD9"]}
          data={data}
          padAngle={3}
          labels={({ datum }) =>
            `${truncateLabel(datum.x)}: ${budget.currency}${formatNumber(
              datum.y
            )}`
          }
          labelPosition={(_) => "centroid"}
          labelPlacement={(_) => labelPlacement}
          style={{ labels: { padding: 15 } }}
          labelComponent={<VictoryLabel renderInPortal />}
        />
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
}

export default CategoryPieChart;
