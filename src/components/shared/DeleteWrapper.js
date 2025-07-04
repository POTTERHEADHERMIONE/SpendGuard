import React from "react";
import { connect } from "react-redux";
import SubmitButton from "./SubmitButton";
import Form from "./Form";
import NoButton from "./NoButton";
import { setTooltip } from "../../actions/tooltip_actions";

function DeleteWrapper(deleteMethod) {
  function Delete({ deletable, name, setRemove, deleteMethod, setTooltip }) {
    const close = () => {
      setRemove(false);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      deleteMethod(deletable).then((_) => setTooltip(`${name} was deleted.`));
    };

    return (
      <Form callback={handleSubmit} className={"confirm"}>
        <span>Are you sure you want to delete {name}?</span>

        <SubmitButton value="Yes" />

        <NoButton callback={close} />
      </Form>
    );
  }

  return connect(null, { deleteMethod, setTooltip })(Delete);
}

export default DeleteWrapper;
