import React from "react";

function Error({ msg, condition }) {
  const displayError = () => (condition ? msg : null);

  return <div className="error">{displayError()}</div>;
}

export default Error;
