import React from "react";
import { connect } from "react-redux";
import { archiveBudget } from "../../actions/archive_actions";
import Form from "../shared/Form";
import SubmitButton from "../shared/SubmitButton";
import NoButton from "../shared/NoButton";
import { setTooltip } from "../../actions/tooltip_actions";

function Archive({
  budget,
  archiveBudget,
  expenditures,
  setArchive,
  setTooltip,
}) {
  const close = () => {
    setArchive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    archiveBudget(budget, expenditures).then((_) =>
      setTooltip(`${budget.name} was archived.`)
    );
  };

  return (
    <Form callback={handleSubmit} className={"confirm"}>
      <span>Are you sure you want to archive {budget.name}?</span>

      <SubmitButton value="Yes" />

      <NoButton callback={close} />
    </Form>
  );
}

const mapStateToProps = (state) => ({
  expenditures: state.expenditures,
});

export default connect(mapStateToProps, { archiveBudget, setTooltip })(Archive);
