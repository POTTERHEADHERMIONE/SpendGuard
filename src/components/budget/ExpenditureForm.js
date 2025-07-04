import React from "react";
import { connect } from "react-redux";
import { patchSettings } from "../../actions/settings_actions";
import DateComp from "../shared/DateComp";
import Form from "../shared/Form";
import SubmitButton from "../shared/SubmitButton";
import NumberInput from "../shared/NumberInput";
import TextInput from "../shared/TextInput";
import Error from "../shared/Error";
import CancelButton from "../shared/CancelButton";
import Modal from "../shared/Modal";

function ExpenditureForm({
  onSubmit,
  title,
  setTitle,
  categories,
  currency,
  amount,
  setAmount,
  patchSettings,
  showError,
  setExpenseDate,
  expenseDate,
  startDate,
  close,
  edit = false,
}) {
  const handleCategory = (title) => {
    if (!categories.includes(title.trim())) {
      patchSettings({ categories: [...categories, title] });
    }
  };

  const handleSubmit = (e) => {
    handleCategory(title);
    onSubmit(e);
  };

  return (
    <Modal>
      <Form callback={handleSubmit} className="expenditure-form">
        <h2>{edit ? "Edit" : "Add"} an Expense</h2>

        <div>
          <label htmlFor="expense-title">Title (optional)</label>
          <TextInput
            placeholder="Groceries"
            value={title}
            callback={setTitle}
            list="saved-categories"
            autoFocus={true}
            maxLength="50"
            id="expense-title"
          />
        </div>
        <datalist id="saved-categories">
          {categories.map((name) => (
            <option value={name} key={name} />
          ))}
        </datalist>

        <div>
          <label htmlFor="expense-amount">Amount</label>
          <span>
            {currency}
            <NumberInput
              value={amount}
              callback={setAmount}
              allowNeg={true}
              id="expense-amount"
            />
          </span>
        </div>

        <div>
          <label htmlFor="expense-date">Date (optional):</label>
          <DateComp
            setStartDate={setExpenseDate}
            date={expenseDate}
            minDate={startDate}
            maxDate={new Date()}
            id="expense-date"
          />
        </div>

        <Error msg="Amount is required" condition={showError} />

        <div className="buttons">
          <SubmitButton value="Save" />

          <CancelButton callback={close} />
        </div>
      </Form>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  categories: state.settings.categories,
});

export default connect(mapStateToProps, { patchSettings })(ExpenditureForm);
