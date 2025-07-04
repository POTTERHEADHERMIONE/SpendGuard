import React from "react";
import Button from "./Button";
import close from "../../images/close.svg";

function CloseButton({ callback }) {
  return (
    <Button
      callback={callback}
      className="close"
      display={<img src={close} alt="close" />}
    />
  );
}

export default CloseButton;
