export function formatNumber(value) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

function objectMapper(itemsArray, selector) {
  return itemsArray.reduce((accum, el) => {
    if (!accum[el[selector]]) {
      accum[el[selector]] = [];
    }

    accum[el[selector]].push(el);

    return accum;
  }, {});
}

export function budgetsByCurrency(budgets) {
  return objectMapper(budgets, "currency");
}

export function formatExpenditures(expenditures) {
  return objectMapper(expenditures, "budgetId");
}

export function sortByDateDesc(arr) {
  return [...arr].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function sortByStartDateAsc(arr) {
  return [...arr].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function addLeadingZero(int) {
  return int.toString().padStart(2, 0);
}

export function formatDate(dateObj, delimiter = "/") {
  const year = dateObj.getFullYear();
  const month = addLeadingZero(dateObj.getMonth() + 1);
  const day = addLeadingZero(dateObj.getDate());

  return `${year}${delimiter}${month}${delimiter}${day}`;
}

export function replaceHyphens(str) {
  return str.replace(/-/g, "/");
}

export function replaceForwardSlashes(str) {
  return str.replace(/\//g, "-");
}

export function makeDate() {
  const date = new Date();

  return formatDate(date);
}

export function displayDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}
