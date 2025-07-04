import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import CreateBudget from "./dashboard/CreateBudget";
import Budgets from "./dashboard/Budgets";
import { updateBudgetsCurrentPeriods } from "../actions/budget_actions";
import { fetchExpenditures } from "../actions/expenditure_actions";
import { connect } from "react-redux";
import { chooseSettings, chooseArchive } from "../actions/ui_actions";
import { fetchSettings } from "../actions/settings_actions";
import ScrollToTop from "./shared/ScrollToTop";
import clock from "../images/clock.svg";
import cog from "../images/cog.svg";
import useJumpToTop from "../hooks/useJumpToTop";
import Button from "./shared/Button";
import DarkModeBtn from "./dashboard/DarkModeBtn";
import Loading from "./shared/Loading";

function Dashboard({
  budgets,
  updateBudgetsCurrentPeriods,
  fetchExpenditures,
  expenditures,
  forceUpdate,
  chooseSettings,
  chooseArchive,
  fetchSettings,
}) {
  const [showLoad, setShowLoad] = useState(true);

  useEffect(() => {
    Promise.all([
      updateBudgetsCurrentPeriods(),
      fetchExpenditures(),
      fetchSettings(),
    ]).then((_) => setTimeout(() => setShowLoad(false), 200));
  }, [
    updateBudgetsCurrentPeriods,
    fetchExpenditures,
    forceUpdate,
    fetchSettings,
  ]);

  useJumpToTop();

  return (
    <>
      <Loading condition={showLoad} />

      <CreateBudget />
      <Budgets {...{ budgets, expenditures }} />

      <div className="dash-buttons">
        <Button
          callback={chooseSettings}
          display={<img src={cog} alt="Settings" />}
        />

        <DarkModeBtn />

        <Button
          callback={chooseArchive}
          display={<img src={clock} alt="Archive" />}
        />
      </div>

      <ScrollToTop />
    </>
  );
}

const mapStateToProps = (state) => ({
  budgets: state.budget.budgets,
  expenditures: state.expenditures,
});

export default connect(mapStateToProps, {
  updateBudgetsCurrentPeriods,
  fetchExpenditures,
  fetchSettings,
  chooseSettings,
  chooseArchive,
})(Dashboard);
