import React from "react";

function Form(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const cb = props.callback;

    if (typeof cb === "function") {
      cb(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={props.className}>
      {props.children}
    </form>
  );
}

export default Form;
