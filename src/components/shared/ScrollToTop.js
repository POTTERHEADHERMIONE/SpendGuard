import React from "react";
import { scrollToTop } from "../../utils/uiBehavior";
import upArrow from "../../images/up-arrow.svg";

function ScrollToTop() {
  return (
    <button onClick={scrollToTop} className="scroll-to-top">
      <img src={upArrow} alt="scroll to top" />
    </button>
  );
}

export default ScrollToTop;
