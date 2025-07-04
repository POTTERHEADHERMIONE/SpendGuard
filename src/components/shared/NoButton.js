import React from "react";
import Button from "./Button";

function NoButton({ callback, className = "" }) {
  return <Button {...{ callback, className }} display="No" />;
}

export default NoButton;
