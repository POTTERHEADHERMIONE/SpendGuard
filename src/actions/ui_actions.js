import { CHANGE_VIEW } from "../constants/redux";

const changeView = (view) => ({
  type: CHANGE_VIEW,
  view,
});

export const chooseDashboard = () => changeView("DASHBOARD");

export const chooseBudget = () => changeView("BUDGET");

export const chooseSettings = () => changeView("SETTINGS");

export const chooseArchive = () => changeView("ARCHIVE");
