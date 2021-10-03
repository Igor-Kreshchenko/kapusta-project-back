const { Transaction } = require("../../models")
const { findTransactions } = require("../../utils")
const createError = require('http-errors')

const deleteTransaction = async (req, res, next) => {
    const { operationType, operationId } = req.params
    if ((!operationType) || (!operationId)) {
        throw new createError(400, 'Transaction type and transaction id must be present')
    }
    if ((operationType !== 'income') || (operationType !== 'expenses')) {
        throw new createError(400, 'Transaction type must be "income" or "expenses"')
    }
    const { _id: userId } = req.user
    const userTransactions = await findTransactions(userId, res)
    const { _id: transactionId } = userTransactions
    let balance = userTransactions.balance
    if (operationType == 'income') {
        let income = userTransactions.income
        const elem = income.find(inc => inc.id === operationId)
        if (!elem) {
            throw new createError(400, `Cannot find income transaction with id = ${operationId}`)
        }
        balance -= elem.amount
        income = income.filter(inc => inc.id !== operationId)
        await Transaction.findByIdAndUpdate(transactionId, {balance, income})
    } else {
        let expenses = userTransactions.expenses
        const elem = expenses.find(exp => exp.id === operationId)
        if (!elem) {
            throw new createError(400, `Cannot find expenses transaction with id = ${operationId}`)
        }
        balance += elem.amount
        expenses = expenses.filter(exp => exp.id !== operationId)
        await Transaction.findByIdAndUpdate(transactionId, {balance, expenses})
    }
 }

module.exports = deleteTransaction