const { findByEmail, updateToken } = require("../../repositories/users");
const bcrypt = require("bcryptjs");
const HttpCode = require("../../helpers/constants");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);

  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);

  if (!user || !compareResult) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      responseBody: {
        message: "Email or password is wrong",
      },
    });
  }

  if (!user.verify) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      responseBody: {
        message: "Email is not verified !",
      },
    });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });
  await updateToken(user.id, token);

  return res.status(HttpCode.OK).json({
    status: "OK",
    contentType: "application/json",
    code: HttpCode.OK,
    responseBody: {
      token,
      user: {
        email: user.email,
      },
    },
  });
};

module.exports = login;
