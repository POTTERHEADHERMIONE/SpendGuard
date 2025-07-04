import React, { useState } from "react";
import EditItem from "./EditItem";
import { formatNumber, displayDate } from "../../utils/format";
import { connect } from "react-redux";
import { destroyExpenditure } from "../../actions/expenditure_actions";
import ClickOrHold from "../shared/ClickOrHold";
import Button from "../shared/Button";
import { setTooltip } from "../../actions/tooltip_actions";
import useAnimationIn from "../../hooks/useAnimationIn";

function Item({
  item,
  item: { id, date, title, amount },
  currency,
  destroyExpenditure,
  budget,
  setTooltip,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showExpense, setShowExpense] = useState("");

  useAnimationIn(() => setShowExpense("show-period-expense"));

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleDelete = () => {
    destroyExpenditure(item).then((_) =>
      setTooltip(`${title || "Untitled"} was deleted.`)
    );
  };

  return (
    <li id={`exp-${id}`} className={showExpense}>
      <Button callback={handleDelete} className="delete-expense" display="x" />

      <ClickOrHold holdCallback={handleEdit}>
        <span className="expense-date">{displayDate(date)}</span>
        <span className="expense-title">{title || "Untitled"}</span>
        <span className="expense-spent">
          {currency}
          {formatNumber(amount)}
        </span>
      </ClickOrHold>

      {showEdit ? (
        <EditItem {...{ item, currency, setShowEdit, budget }} />
      ) : null}
    </li>
  );
}

export default connect(null, { destroyExpenditure, setTooltip })(Item);
