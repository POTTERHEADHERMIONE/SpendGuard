import React from "react";
import { handleChangeWithRegex } from "../../utils/formMethods";

function TextInputWithRegex({
  placeholder = "",
  value,
  expr,
  callback,
  className = "",
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChangeWithRegex(e, expr, callback)}
      className={className}
    />
  );
}

export default TextInputWithRegex;
