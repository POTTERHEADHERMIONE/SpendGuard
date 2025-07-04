import React from "react";
import ReactDOM from "react-dom";
import "./styles/colors-default.css";
import "./styles/reset.css";
import "./styles/index.css";
import App from "./components/App";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import budgetReducer from "./reducers/budget_reducer";
import expenditureReducer from "./reducers/expenditure_reducer";
import settingsReducer from "./reducers/settings_reducer";
import errorReducer from "./reducers/error_reducer";
import archiveReducer from "./reducers/archive_reducer";
import uiReducer from "./reducers/ui_reducer";
import tooltipReducer from "./reducers/tooltip_reducer";

const store = createStore(
  combineReducers({
    budget: budgetReducer,
    expenditures: expenditureReducer,
    settings: settingsReducer,
    errors: errorReducer,
    archive: archiveReducer,
    currentView: uiReducer,
    tooltip: tooltipReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
