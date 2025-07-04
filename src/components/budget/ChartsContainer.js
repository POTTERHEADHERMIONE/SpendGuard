import React from "react";
import "../../styles/chart.css";
import SpendLineChart from "./SpendLineChart";
import { periodsToChart } from "../../constants/general";
import CategoryPieChart from "./CategoryPieChart";
import CloseButton from "../shared/CloseButton";
import useJumpToTop from "../../hooks/useJumpToTop";
import Modal from "../shared/Modal";
import ChartContainer from "./ChartContainer";

function ChartsContainer({
  budget,
  budget: { name, frequency },
  expenditures,
  close,
}) {
  useJumpToTop();

  return (
    <Modal className="charts">
      <CloseButton callback={close} />

      <h2>{name}</h2>

      <ChartContainer>
        <h4>
          Spending per {frequency}, up to last {periodsToChart} periods
        </h4>
        <SpendLineChart {...{ budget, expenditures }} />
      </ChartContainer>

      <ChartContainer>
        <h4 className="small-width">Spending per category</h4>
        <CategoryPieChart {...{ budget, expenditures }} />
      </ChartContainer>
    </Modal>
  );
}

export default ChartsContainer;
