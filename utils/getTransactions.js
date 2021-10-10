const getTransactions = (operationType, month, year, userTransactions) => {
    const {expenses, income} = userTransactions;
    
    let result;
    if (operationType === "income"){
        if (!month || !year){
            result = income;
        } else {
            result = income.filter((inc) => {
                const validDate = inc.date.split('.');
                return (parseInt(validDate[1]) === month) && (parseInt(validDate[2]) === year)
                //const validDate = new Date(inc.date);
                //return validDate.getFullYear() === year && validDate.getMonth()+1 === month;
            });
        }
    }else if (operationType === "expenses"){
        if (!month || !year){
            result = expenses;
        }else{
            result = expenses.filter((exp) => {
                const validDate = exp.date.split('.');
                return (parseInt(validDate[1]) === month) && (parseInt(validDate[2]) === year)
                //const validDate = new Date(exp.date);
                //return validDate.getFullYear() === year && validDate.getMonth()+1 === month;
            });
        }
    };

    return result;
};  

module.exports = getTransactions;