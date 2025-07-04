import React from "react";

function HiddenLabel({ id, text }) {
  return (
    <label htmlFor={id} className="hidden-label">
      {text}
    </label>
  );
}

export default HiddenLabel;
