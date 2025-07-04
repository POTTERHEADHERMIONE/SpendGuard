import React from "react";
import Button from "./Button";
import back from "../../images/back.svg";

function BackButton({ callback }) {
  return (
    <Button
      callback={callback}
      className="back"
      display={<img src={back} alt="back" />}
    />
  );
}

export default BackButton;
