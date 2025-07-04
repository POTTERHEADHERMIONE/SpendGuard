export const handleChange = (e, callback) => {
  const value = e.target ? e.target.value : e;

  callback(value);
};

const testRegex = (expr, value) => {
  const regex = RegExp(expr);

  return regex.test(value) || !value;
};

export const handleChangeWithRegex = (e, expr, callback) => {
  const value = e.target.value;

  if (testRegex(expr, value)) {
    handleChange(e, callback);
  }
};

const numberRegex = /^\d+(\.\d?\d?)?$/;

export const handleAmountChange = (e, callback) => {
  handleChangeWithRegex(e, numberRegex, callback);
};

export const handleAmountChangeNeg = (e, callback) => {
  let negStr = "";
  let value = e.target.value;

  if (value.startsWith("-")) {
    negStr = "-";
    value = value.slice(1);
  }

  if (testRegex(numberRegex, value)) {
    handleChange(negStr + value, callback);
  }
};

export const validateAmount = (amount) => !isNaN(parseFloat(amount));
