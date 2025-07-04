import React from "react";

function SubmitButton({ value, className = "" }) {
  return <input type="submit" value={value} className={className} />;
}

export default SubmitButton;
