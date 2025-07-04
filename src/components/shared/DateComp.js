import React, { useState, useEffect } from "react";
import {
  formatDate,
  replaceHyphens,
  replaceForwardSlashes,
} from "../../utils/format";

const makeDate = (date = null) => {
  const dateValue = date ? new Date(date) : new Date();
  return formatDate(dateValue, "-");
};

function DateComp({
  setStartDate,
  date,
  disabled = false,
  minDate,
  maxDate,
  id = "",
}) {
  const [dateVal, setDateVal] = useState(replaceForwardSlashes(date));
  const today = makeDate();

  useEffect(() => {
    if (date === "") {
      setDateVal(date);
    }
  }, [date]);

  const handleChange = (e) => {
    const date = replaceHyphens(e.target.value);

    setDateVal(e.target.value);

    if (e.target.value) {
      setStartDate(formatDate(new Date(date)));
    } else {
      setStartDate("");
    }
  };

  return (
    <input
      type="date"
      min={minDate ? makeDate(minDate) : today}
      max={maxDate ? makeDate(maxDate) : ""}
      onChange={handleChange}
      disabled={disabled}
      value={dateVal}
      id={id}
    />
  );
}

export default DateComp;
