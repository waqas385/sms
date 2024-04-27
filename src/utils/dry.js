
// Date relevant functions
function prefixZeroIfNeeded(n) {
  return String(n).padStart(2, 0);
}

export function parseDateToDateTime(dateString) {
  const date = new Date(dateString);

  const { year, month, monthDate } = getCurrentDate(date);
  const hours = prefixZeroIfNeeded(date.getHours());
  const minutes = prefixZeroIfNeeded(date.getMinutes());
  const seconds = prefixZeroIfNeeded(date.getSeconds());

  return `${year}-${month}-${monthDate} ${hours}:${minutes}:${seconds}`;
}

function getCurrentDate(dateObject) {
  const date = dateObject ? dateObject :new Date();
  const year = date.getFullYear();
  const month = prefixZeroIfNeeded(date.getMonth() + 1);
  const monthDate = prefixZeroIfNeeded(date.getDate());
  return {
    year,
    month,
    monthDate,
  };
}

export function getCurrentDateWithMilliseconds() {
  const date = new Date();
  const { year, month, monthDate } = getCurrentDate();
  const miliSeconds = date.getMilliseconds();

  return `${year}${month}${monthDate}_${miliSeconds}`;
}

export function getCurrentDateTime() {
  const date = new Date();
  const { year, month, monthDate } = getCurrentDate();
  const hours = prefixZeroIfNeeded(date.getHours());
  const minutes = prefixZeroIfNeeded(date.getMinutes());
  const seconds = prefixZeroIfNeeded(date.getSeconds());

  return `${year}-${month}-${monthDate} ${hours}:${minutes}:${seconds}`;
}
// Date relevant functions ENDS

export function prepareInsertQueryData(data, columns) {
  let columnsData = {};
  columns.forEach((column) => {
    columnsData[column] = data[column];
  });
  return columnsData;
}

export function anyFieldEmpty(form) {
  let invalidFields = Object.values(form).map(val => !val).filter(Boolean);
  return invalidFields.length > 0;
}