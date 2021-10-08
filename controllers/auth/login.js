const { Users } = require("../../repositories/users");
const HttpCode = require("../../helpers/constants");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail({ email });
  const isValidPassword = await user?.validPassword(password);
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      responseBody: {
        message: "Email or password is wrong",
      },
    });
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });
  await Users.updateToken(user.id, token);
  return res.status(HttpCode.OK).json({
    status: "Ok",
    contentType: "application/json",
    code: HttpCode.OK,
    responseBody: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
