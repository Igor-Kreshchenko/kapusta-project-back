const {findTransactions, addTransaction} = require("../../utils");

const addOperations = async (req, res, _) => {
    const {operationType} = req.params;
    const {body} = req;
    const {_id: userId} = req.user;

    const userTransactions = await findTransactions(userId, res);
    await addTransaction(body, userTransactions, operationType);

    res.status(201).json({
        status: "Success",
        code: 201,
        body,
    });
};

module.exports = addOperations;