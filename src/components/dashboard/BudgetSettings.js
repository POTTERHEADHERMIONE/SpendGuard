import React, { useState } from "react";
import UpdateBudget from "./UpdateBudget";
import DeleteWrapper from "../shared/DeleteWrapper";
import { destroyBudget } from "../../actions/budget_actions";
import Archive from "./Archive";
import Button from "../shared/Button";
import Modal from "../shared/Modal";

/** DELETING A BUDGET DELETES ALL DEPENDENT RECORDS **/
/** THIS IS DEFAULT BEHAVIOR WITH JSON-SERVER BUT NOT **/
/** FOR OTHER FORMS OF DATA STORAGE **/

const Delete = DeleteWrapper(destroyBudget);

function BudgetSettings({
  setShowBudgetSettings,
  budget,
  budget: { name, id },
}) {
  const [remove, setRemove] = useState(false);
  const [archive, setArchive] = useState(false);

  const close = () => setShowBudgetSettings(false);

  return (
    <Modal>
      <h2>Edit {name}</h2>

      <UpdateBudget {...{ budget, close }} />

      <div>
        <Button
          callback={() => setArchive(true)}
          className="archive-btn"
          display="Archive"
        />

        {archive ? <Archive {...{ budget, setArchive }} /> : null}

        <Button
          callback={() => setRemove(true)}
          className="delete-btn"
          display="Delete"
        />

        {remove ? <Delete deletable={id} {...{ name, setRemove }} /> : null}
      </div>
    </Modal>
  );
}

export default BudgetSettings;
