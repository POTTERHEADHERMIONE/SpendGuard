import React from "react";
import Button from "./Button";

function CancelButton({ callback, className = "" }) {
  return <Button {...{ callback, className }} display="Cancel" />;
}

export default CancelButton;
