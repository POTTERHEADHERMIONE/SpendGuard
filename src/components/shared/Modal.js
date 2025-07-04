import React from "react";
import useDisableScroll from "../../hooks/useDisableScroll";

function Modal({ children, className = "" }) {
  useDisableScroll(true);

  return (
    <div className="modal-background">
      <div className={`modal ${className}`}>{children}</div>
    </div>
  );
}

export default Modal;
