import React, { useState } from "react";

function SingleTooltip({ tooltip: { tooltip, id }, clearTooltip }) {
  const [moveTooltip, setMoveTooltip] = useState("");

  setTimeout(() => {
    setMoveTooltip("move-tooltip");
  }, 5);

  setTimeout(() => {
    clearTooltip(id);
  }, 3000);

  return (
    <div className={moveTooltip}>
      <div>{tooltip}</div>
      <span className="triangle"></span>
    </div>
  );
}

export default SingleTooltip;
