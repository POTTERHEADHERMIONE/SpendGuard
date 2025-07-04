import React, { useState, useRef } from "react";
import { getBodyOffsetY } from "../../utils/uiBehavior";

function ClickOrHold({ holdCallback, clickCallback, children }) {
  const [timer, setTimer] = useState("");
  const [wasHeld, setWasHeld] = useState(false);
  const offsetY = useRef(getBodyOffsetY());

  const isSwipe = () => offsetY.current !== getBodyOffsetY();

  const startHold = (e) => {
    setWasHeld(false);
    offsetY.current = getBodyOffsetY();

    setTimer(
      setTimeout(() => {
        if (!isSwipe() && typeof holdCallback === "function") {
          holdCallback(e);
          setWasHeld(true);
        }
      }, 500)
    );
  };

  const handleClick = (e) => {
    clearTimeout(timer);

    if (!wasHeld && !isSwipe() && typeof clickCallback === "function") {
      clickCallback(e);
    }
  };

  return (
    <span
      onMouseDown={startHold}
      onClick={handleClick}
      onTouchStart={startHold}
      onTouchEnd={handleClick}
    >
      {children}
    </span>
  );
}

export default ClickOrHold;
