import React from "react";
import { handleChange } from "../../utils/formMethods";

function TextInput({
  placeholder,
  callback,
  value,
  maxLength = "100",
  list = "",
  className = "",
  autoFocus = false,
  id = "",
  disabled = false,
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => handleChange(e, callback)}
      value={value}
      maxLength={maxLength}
      list={list}
      className={className}
      autoFocus={autoFocus}
      id={id}
      disabled={disabled}
    />
  );
}

export default TextInput;
