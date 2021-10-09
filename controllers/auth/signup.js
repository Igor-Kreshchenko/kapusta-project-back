const { findByEmail, create } = require("../../repositories/users");
const transactions = require("../../repositories/transactions");

const HttpCode = require("../../helpers/constants");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);

  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      contentType: "application/json",
      code: HttpCode.CONFLICT,
      responseBody: {
        message: "Already registered",
      },
    });
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await create({ email, password: hashPassword });

  const newTransaction = await transactions.create(newUser._id);

  return res.status(HttpCode.CREATED).json({
    status: "created",
    contentType: "application/json",
    code: HttpCode.CREATED,
    responseBody: {
      token: newUser.token,
      user: {
        email: newUser.email,
        balance: newTransaction.balance,
      },
    },
  });
};

module.exports = signup;
