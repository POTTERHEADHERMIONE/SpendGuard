import React, { useState, useEffect } from "react";
import useDisableScroll from "../hooks/useDisableScroll";
import { enableScroll } from "../utils/uiBehavior";

function AppLoad({ didMount }) {
  const [show, setShow] = useState(didMount.current);
  const [fade, setFade] = useState("");

  useDisableScroll();

  useEffect(() => {
    setTimeout(() => {
      setFade("fade-out");
      setShow(false);
      enableScroll();
    }, 2000);

    setTimeout(() => {
      didMount.current = false;
    }, 2500);
  }, [didMount]);

  if (!show) {
    return null;
  }

  return (
    <div className={`loading ${fade} app`}>
      <h1>Simply Budget</h1>
    </div>
  );
}

export default AppLoad;
