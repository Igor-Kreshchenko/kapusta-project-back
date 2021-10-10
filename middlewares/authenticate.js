const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const { User } = require("../models");

const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    const { id } = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findOne({ _id: id });
    if (!user || user.token !== token) {
      throw new Unauthorized("Not authorized");
    }

    req.id = id;
    req.user = user;
    next();
  } catch /*(error) {next(error);}*/ {
    throw new Unauthorized("Not authorized");
  }
};

module.exports = authenticate;
