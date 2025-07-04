import React from "react";
import {
  periodsToChart,
  periodOptions,
  msPerDay,
} from "../../constants/general";
import { calculatePeriodSpent } from "../../utils/calculate";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";
import { displayDate } from "../../utils/format";

function SpendLineChart({
  budget,
  budget: { currency, limit, currentPeriod, frequency, startDate },
  expenditures,
}) {
  const totalPeriods =
    currentPeriod < periodsToChart ? currentPeriod : periodsToChart;

  let tickValues = Array(totalPeriods).fill(null);
  tickValues = tickValues.map((_, idx) => currentPeriod - idx);

  const data = tickValues.reduce((accum, period) => {
    const changeInTime =
      msPerDay * periodOptions[frequency].days * (period - 1);
    const date = new Date(new Date(startDate).getTime() + changeInTime);

    accum.push({
      period,
      date: displayDate(date),
      spent: calculatePeriodSpent({ expenditures, budget, period }),
    });

    return accum;
  }, []);

  const maxSpent = data.reduce(
    (most, obj) => (most > obj.spent ? most : obj.spent),
    0
  );
  const yDomain = [0, Math.max(maxSpent, limit * 2)];

  const domain =
    tickValues.length > 1
      ? { x: [tickValues[tickValues.length - 1], tickValues[0]], y: yDomain }
      : { x: [tickValues[0], tickValues[0] + 1], y: yDomain };

  return (
    <VictoryChart domain={domain}>
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={tickValues}
        tickFormat={data.map((val) => val.date)}
        tickLabelComponent={
          <VictoryLabel renderInPortal textAnchor="start" angle={45} dx={-10} />
        }
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => `${currency}${x}`}
        tickLabelComponent={<VictoryLabel renderInPortal textAnchor="end" />}
      />

      <VictoryLine
        y={() => limit}
        style={{ data: { opacity: 0.5, stroke: "#c43a31", strokeWidth: 1 } }}
      />

      {tickValues.length === 1 ? <VictoryLine y={() => data[0].spent} /> : null}

      <VictoryLine x="period" y="spent" data={data} />
    </VictoryChart>
  );
}

export default SpendLineChart;
