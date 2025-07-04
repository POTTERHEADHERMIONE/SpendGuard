import React from "react";

function ChartContainer({ children }) {
  return (
    <div className="chart-container">
      <div className="charts-overlay"></div>
      {children}
    </div>
  );
}

export default ChartContainer;
