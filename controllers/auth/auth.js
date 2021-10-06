const { Users } = require("../../models");
const HttpCode = require("../../helpers/constants");
const { UserRepo } = require("../../repositories");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      contentType: "application/json",
      code: HttpCode.CONFLICT,
      responseBody: {
        message: "Email in use",
      },
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.json({
      status: "created",
      contentType: "application/json",
      code: HttpCode.CREATED,
      responseBody: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
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

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const current = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await Users.getCurrentUser(userId);
    console.log(user);
    if (user) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  current,
};
