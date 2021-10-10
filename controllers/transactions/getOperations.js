const { findTransactions, getTransactions } = require("../../utils");
const HttpCode = require("../../helpers/constants");

const getOperations = async (req, res, _) => {
    const { operationType } = req.params;
    if ((operationType !== "income") && (operationType !== "expenses")) {
        return res.status(HttpCode.NOT_FOUND).json({
            status: "error",
            code: HttpCode.NOT_FOUND,
            message: "Path parameter with operation type is wrong"
        });
    };
    let month;
    let year;
    if ((!req.query) || (!req.query.month) || (!req.query.year)) {
        month = null;
        year = null;
    } else {
        month = parseInt(req.query.month);
        year = parseInt(req.query.year);
    };
    const {_id: userId} = req.user;

    const userTransactions = await findTransactions(userId, res);
    const data = getTransactions(operationType, month, year, userTransactions);

    res.json({
        status: "Success",
        code: 200,
        data,
    });
};

module.exports = getOperations;