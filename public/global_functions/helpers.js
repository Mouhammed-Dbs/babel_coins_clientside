const getDateFormated = (date) => {
  let orderedDateInDateFormat = new Date(date);
  const year = orderedDateInDateFormat.getFullYear();
  const month = orderedDateInDateFormat.getMonth() + 1;
  const day = orderedDateInDateFormat.getDate();
  orderedDateInDateFormat = `${year}/${month}/${day}`;
  return orderedDateInDateFormat;
};

const getTimeFormated = (date) => {
  let orderedTimeInDateFormat = new Date(date);
  const hours = orderedTimeInDateFormat.getHours();
  const minutes = orderedTimeInDateFormat.getMinutes();
  const seconds = orderedTimeInDateFormat.getSeconds();
  orderedTimeInDateFormat = `${hours}:${minutes}:${seconds}`;
  return orderedTimeInDateFormat;
};

const getDateTimeFormated = (date) => {
  return getDateFormated(date) + " " + getTimeFormated(date);
};

export { getDateFormated, getTimeFormated, getDateTimeFormated };
