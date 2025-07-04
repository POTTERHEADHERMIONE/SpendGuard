import React from "react";
import { handleChange } from "../../utils/formMethods";

function Select({ callback, value, optionsCallback, id = "" }) {
  return (
    <select onChange={(e) => handleChange(e, callback)} value={value} id={id}>
      {optionsCallback()}
    </select>
  );
}

export default Select;
