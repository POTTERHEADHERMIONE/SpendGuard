import React from "react";
import {
  handleAmountChange,
  handleAmountChangeNeg,
} from "../../utils/formMethods";

function NumberInput({
  value,
  callback,
  className = "",
  id = "",
  autoFocus = false,
  allowNeg = false,
}) {
  const handleChange = allowNeg ? handleAmountChangeNeg : handleAmountChange;

  return (
    <input
      type="text"
      placeholder="100.00"
      value={value}
      onChange={(e) => handleChange(e, callback)}
      className={className}
      autoFocus={autoFocus}
      id={id}
    />
  );
}

export default NumberInput;
