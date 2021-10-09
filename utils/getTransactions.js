const getTransactions = (operationType, month, year, userTransactions) => {
    const {expenses, income} = userTransactions;
    
    let result;

    if (operationType === "income"){
        if (!month || !year){
            result = income;
        }else{
            result = income.filter(({date}) => {
                const validDate = new Date(date);
                return validDate.getFullYear() === year && validDate.getMonth()+1 === month;
            });
        }
    }else if (operationType === "expense"){
        if (!month || !year){
            result = expenses;
        }else{
            result = expenses.filter(({date}) => {
                const validDate = new Date(date);
                return validDate.getFullYear() === year && validDate.getMonth()+1 === month;
            });
        }
    };

    return result;
};  

exports.module = getTransactions;