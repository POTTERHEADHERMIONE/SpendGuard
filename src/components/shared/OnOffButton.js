import React from "react";
import Button from "./Button";

function OnOffButton({ condition, callback }) {
  return (
    <Button
      display={condition ? "On" : "Off"}
      callback={callback}
      className="on-off-btn"
    />
  );
}

export default OnOffButton;
