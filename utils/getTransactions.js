const dateValidation = (date, year, month) => {
  const validDate = date.split('.');
  return ((parseInt(validDate[1]) === month) && (parseInt(validDate[2]) === year));
  //const validDate = new Date(date);
  //return (validDate.getFullYear() === year && validDate.getMonth() + 1 === month);
}

const getTransactions = (operationType, month, year, userTransactions) => {
  const { expenses, income } = userTransactions;
  let result;

  if (operationType === "income") {
    if (!month || !year) {
      result = income;
    } else {
      result = income.filter(({ date }) => dateValidation(date, year, month));
    }
  } else if (operationType === "expense") {
    if (!month || !year) {
      result = expenses;
    } else {
      result = expenses.filter(({ date }) => dateValidation(date, year, month));
    }
  }

  return result;
};

module.exports = getTransactions;
