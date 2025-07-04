import React from "react";
import TextInput from "./TextInput";

function CurrencyInput({
  callback,
  value,
  id = "",
  autoFocus = true,
  className = "",
}) {
  return (
    <TextInput
      placeholder="$"
      callback={callback}
      value={value}
      maxLength="5"
      id={id}
      autoFocus={autoFocus}
      className={className}
    />
  );
}

export default CurrencyInput;
