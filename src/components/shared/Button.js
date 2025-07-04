import React from "react";

function Button({
  callback,
  display,
  className = "",
  id = "",
  disabled = false,
}) {
  return (
    <button
      onClick={callback}
      className={className}
      id={id}
      disabled={disabled}
    >
      {display}
    </button>
  );
}

export default Button;
